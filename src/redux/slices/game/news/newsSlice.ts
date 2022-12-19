import { AnyAction, createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { generateRoundRandomValue } from "../../../../utils/generateRandom";
import { RootState } from "../../../store";
import { increaseWallet } from "../character/characterSlice";
import { conditions } from "../market/models";
import { setStockInterval } from "../market/stocks/stocksSlice";
import { months } from "../time/models";
import { marketNews, newsKinds, newsTopics, personNews } from "./models";
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
  },
});

export const { updateNews } = newsSlice.actions;

// Selectors

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

  // выбираем тип новости / neutral | negative | positive
  const templateKind =
    templateTopic.events[generateRoundRandomValue(templateTopic.events.length)];

  // выбираем новость
  const event = templateKind.titles[generateRoundRandomValue(templateKind.titles.length)];

  let news: News = {
    date,
    kind: templateKind.type,
    type: templateTopic.type,
    text: event.title,
    stock: null,
  };

  switch (templateTopic.type) {
    case newsTopics.PERSONAL:
      if (templateKind.type != newsKinds.NEUTRAL) {
        dispatch(increaseWallet(event.amount as number));
      }
      break;
    case newsTopics.MARKET:
      const stocks = getState().stocks.stocks;

      const stock = stocks[generateRoundRandomValue(stocks.length)];

      news.stock = stock.title;

      if (templateKind.type != newsKinds.NEGATIVE) {
        const priceChangeType =
          templateKind.type === newsKinds.POSITIVE ? conditions.UP : conditions.DOWN;
        const interval = generateRoundRandomValue(3) + 2;

        dispatch(
          setStockInterval({
            id: stock.id,
            type: priceChangeType,
            interval,
          })
        );
      }

      break;
    default:
      return null;
  }
  dispatch(updateNews({ news }));
};

export default newsSlice.reducer;
