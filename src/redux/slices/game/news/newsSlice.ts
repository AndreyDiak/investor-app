import {
   AnyAction,
   createSelector,
   createSlice,
   PayloadAction,
   ThunkAction,
} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { generateRoundRandomValue } from "../../../../utils";
import { RootState } from "../../../store";
import { increaseWallet } from "../character/characterSlice";
import { Conditions, setStockInterval } from "../market";
import { months } from "../time/models";
import { marketNews, NewsKinds, NewsTopics, personNews } from "./models";
import { News } from "./typings";

const initialState = {
   newsTemplate: [personNews, marketNews],
   news: [] as News[],
};

export const newsSlice = createSlice({
   name: "news",
   initialState,
   reducers: {
      updateNews: (state, action: PayloadAction<{ news: News }>) => {
         state.news.push(action.payload.news);
      },
      checkNewsById: (state, action: PayloadAction<string>) => {
         console.log("hell");
         const index = state.news.findIndex((item) => item.id === action.payload);
         state.news[index].isChecked = true;
      },
      checkAllNews: (state) => {
         state.news = state.news.map((news) => ({
            ...news,
            isChecked: true,
         }));
      },
      openTopic: (state, action: PayloadAction<NewsTopics>) => {
         switch (action.payload) {
            case NewsTopics.PERSONAL:
               state.newsTemplate[0].ableToShow = true;
               break;
            case NewsTopics.MARKET:
               state.newsTemplate[1].ableToShow = true;
         }
      },
   },
});

export const { updateNews, openTopic, checkNewsById, checkAllNews } = newsSlice.actions;

// Selectors

export const selectNews = (state: RootState) => state.news.news;

export const selectCheckedNews = createSelector(selectNews, (news) =>
   news.filter((item) => item.isChecked).reverse()
);

export const selectNotCheckedNews = createSelector(selectNews, (news) =>
   news.filter((item) => !item.isChecked).reverse()
);

export const selectNotCheckedNewsLength = createSelector(
   selectNotCheckedNews,
   (news) => news.length
);

export const selectLastNews = createSelector(selectNews, (news) =>
   news.length > 0 ? news[news.length - 1] : null
);

type ThunkType = ThunkAction<void, RootState, unknown, AnyAction>;

export const generateNews = (): ThunkType => (dispatch, getState) => {
   // получаемся доступные новости
   const newsTemplate = getState().news.newsTemplate;

   // получаем текущую дату
   const dayInMonth = getState().time.dayInMonth;
   const month = months[getState().time.monthIndex].name;

   // создаем дату в формате string
   const date = `${dayInMonth} ${month}`;

   // выбриаем тематику новости / person | market
   const templateTopic =
      newsTemplate[
         generateRoundRandomValue(newsTemplate.filter((news) => news.ableToShow).length)
      ];

   console.log(newsTemplate.filter((news) => news.ableToShow).length);

   // выбираем тип новости / neutral | negative | positive
   const templateKind =
      templateTopic.events[generateRoundRandomValue(templateTopic.events.length)];

   // выбираем новость / текст + возможная трата
   const event =
      templateKind.titles[generateRoundRandomValue(templateKind.titles.length)];

   const news: News = {
      id: uuidv4(),
      date,
      kind: templateKind.type,
      type: templateTopic.type,
      text: event.title,
      stock: null,
      money: null,
      isChecked: false,
   };

   switch (templateTopic.type) {
      case NewsTopics.PERSONAL:
         if (templateKind.type != NewsKinds.NEUTRAL) {
            dispatch(increaseWallet(event.amount as number));
            news.money = event.amount as number;
         }
         break;
      case NewsTopics.MARKET:
         {
            // рандомим акцию
            // TODO: добавить облигации, когда они будут готовы
            const stocks = getState().stocks.stocks;
            const stock = stocks[generateRoundRandomValue(stocks.length)];

            news.stock = {
               title: stock.title,
               id: stock.id,
            };

            // если новость хорошая или плохая
            // то мы должны засетать воздействие новости на акцию
            if (templateKind.type != NewsKinds.NEUTRAL) {
               // рост или спад
               const priceChangeType =
                  templateKind.type === NewsKinds.POSITIVE
                     ? Conditions.UP
                     : Conditions.DOWN;
               // интервал воздействия новости
               const interval = generateRoundRandomValue(3) + 2;

               dispatch(
                  setStockInterval({
                     id: stock.id,
                     type: priceChangeType,
                     interval,
                  })
               );
            }
         }

         break;
      default:
         return null;
   }
   dispatch(updateNews({ news }));
};

export default newsSlice.reducer;
