import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
   AssetsFilter,
   Conditions,
   incomeToOpenMarket,
   MarketAssetsType,
} from "../../../../../../models";
import { RootState, ThunkType } from "../../../../../store";
import { newsTopics, openTopic } from "../../../news";
import { ToggleAssetCountType } from "../../typings";
import { filterAsset } from "../../utils/filterAsset";
import { Stock } from "./typings";
import { generateStocks, indexingStocks as index } from "./utils";

const mock = [
   {
      condition: "not-changed",
      type: MarketAssetsType.STOCKS,
      count: 62,
      dividendsPercentage: 0,
      id: "3a30cb8b-ebd3-480c-a7a1-84b8c1d4a414",
      minPrice: 27,
      price: [133],
      priceChangeIntervalDueToNews: 0,
      priceGrowOfFallDueToNews: "not-changed",
      risk: "upper-medium",
      title: "ТрансНефтКомпани",
   },
   {
      condition: "not-changed",
      type: MarketAssetsType.STOCKS,
      count: 87,
      dividendsPercentage: 3,
      id: "f459261d-cecc-404a-9860-5952ab504abf",
      minPrice: 18,
      price: [25],
      priceChangeIntervalDueToNews: 0,
      priceGrowOfFallDueToNews: "not-changed",
      risk: "medium",
      title: "ОАО ГазНефтьМагистраль",
   },
];

const initialState = {
   stocks: [] as Stock[],
};

export const stocksSlice = createSlice({
   name: "stocks",
   initialState,
   reducers: {
      setInitialStocks: (state, action: PayloadAction<Stock[]>) => {
         state.stocks = action.payload;
      },
      indexingStocks: (state, action: PayloadAction<Stock[]>) => {
         state.stocks = action.payload;
      },
      setStockInterval: (
         state,
         action: PayloadAction<{ id: string; type: Conditions; interval: number }>
      ) => {
         const index = state.stocks.findIndex((stock) => stock.id === action.payload.id);
         state.stocks[index].priceChangeIntervalDueToNews = action.payload.interval;
         state.stocks[index].priceGrowOfFallDueToNews = action.payload.type;
      },
      toggleStockCount: (
         state,
         action: PayloadAction<{
            id: string;
            count: number;
            type: ToggleAssetCountType;
         }>
      ) => {
         const index = state.stocks.findIndex((stock) => stock.id === action.payload.id);
         if (action.payload.type === "increase") {
            state.stocks[index].count += action.payload.count;
         } else {
            state.stocks[index].count -= action.payload.count;
         }
      },
   },
});

export const { setInitialStocks, indexingStocks, setStockInterval, toggleStockCount } =
   stocksSlice.actions;

// Selectors

export const selectStocks = (state: RootState) => state.stocks.stocks;

export const selectStockById = (id: string) =>
   createSelector(selectStocks, (stocks) => stocks.find((stock) => stock.id === id));

export const selectFilteredStocks = (filter: AssetsFilter, search = "") =>
   createSelector(selectStocks, (stocks) => filterAsset(stocks, filter, search));

// Thunks

export const checkStocks = (): ThunkType => (dispatch, getState) => {
   const stocks = getState().stocks.stocks;
   const difficulty = getState().settings.difficulty;

   if (stocks.length !== 0) {
      const newStocks = index(stocks, difficulty);
      dispatch(indexingStocks(newStocks));
   } else {
      const income = getState().character.totalIncome;

      if (incomeToOpenMarket["stocks"] < income) {
         // открываем возможность показывать новости про акции
         console.log("he");
         dispatch(openTopic(newsTopics.MARKET));

         // создаем акции
         // если наш доход больше чем необходимый минимум
         const newStocks = generateStocks(difficulty);

         dispatch(setInitialStocks(newStocks));
      }
   }
};

export default stocksSlice.reducer;
