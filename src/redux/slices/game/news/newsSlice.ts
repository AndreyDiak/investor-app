import {
   AnyAction,
   createSelector,
   createSlice,
   PayloadAction,
   ThunkAction,
} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { generateRoundRandomValue } from "../../../../utils/generateRandom";
import { RootState } from "../../../store";
import { increaseWallet } from "../character/characterSlice";
import { conditions } from "../market/models";
import { setStockInterval } from "../market/stocks/stocksSlice";
import { months } from "../time/models";
import { marketNews, newsKinds, newsTopics, personNews } from "./models";
import { News, NewsTopics } from "./typings";

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
            case newsTopics.PERSONAL:
               state.newsTemplate[0].ableToShow = true;
               break;
            case newsTopics.MARKET:
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
   // ???????????????????? ?????????????????? ??????????????
   const newsTemplate = getState().news.newsTemplate;

   // ???????????????? ?????????????? ????????
   const dayInMonth = getState().time.dayInMonth;
   const month = months[getState().time.monthIndex].name;

   // ?????????????? ???????? ?? ?????????????? string
   const date = `${dayInMonth} ${month}`;

   // ???????????????? ???????????????? ?????????????? / person | market
   const templateTopic =
      newsTemplate[
         generateRoundRandomValue(newsTemplate.filter((news) => news.ableToShow).length)
      ];

   console.log(newsTemplate.filter((news) => news.ableToShow).length);

   // ???????????????? ?????? ?????????????? / neutral | negative | positive
   const templateKind =
      templateTopic.events[generateRoundRandomValue(templateTopic.events.length)];

   // ???????????????? ?????????????? / ?????????? + ?????????????????? ??????????
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
      case newsTopics.PERSONAL:
         if (templateKind.type != newsKinds.NEUTRAL) {
            dispatch(increaseWallet(event.amount as number));
            news.money = event.amount as number;
         }
         break;
      case newsTopics.MARKET:
         {
            // ???????????????? ??????????
            // TODO: ???????????????? ??????????????????, ?????????? ?????? ?????????? ????????????
            const stocks = getState().stocks.stocks;
            const stock = stocks[generateRoundRandomValue(stocks.length)];

            news.stock = {
               title: stock.title,
               id: stock.id,
            };

            // ???????? ?????????????? ?????????????? ?????? ????????????
            // ???? ???? ???????????? ???????????????? ?????????????????????? ?????????????? ???? ??????????
            if (templateKind.type != newsKinds.NEUTRAL) {
               // ???????? ?????? ????????
               const priceChangeType =
                  templateKind.type === newsKinds.POSITIVE
                     ? conditions.UP
                     : conditions.DOWN;
               // ???????????????? ?????????????????????? ??????????????
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
