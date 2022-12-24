import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { decreaseWallet, increaseWallet } from "../../character/characterSlice";
import { toggleStockCount } from "../stocks/stocksSlice";
import type { Stock } from "../stocks/typings";
import { MarketAssetsToBuy } from "../typings";
import { RootState, ThunkType } from "./../../../../store";
import type { Portfolio } from "./typings";

const initialState = {
   portfolio: [] as Portfolio[],
};

export const portfolioSlice = createSlice({
   name: "portfolio",
   initialState,
   reducers: {
      addToPortfolio: (state, action: PayloadAction<Portfolio>) => {
         const index = state.portfolio.findIndex((item) => item.id === action.payload.id);
         if (index === -1) {
            state.portfolio.push(action.payload);
         } else {
            const item = state.portfolio[index];
            // Делаем среднюю цену
            state.portfolio[index].price[0] =
               (item.price[0] * item.count +
                  action.payload.count * action.payload.price[0]) /
               (action.payload.count + item.count);
            // Обновляем кол-во
            state.portfolio[index].count += action.payload.count;
         }
      },
      removeFromPortfolio: (
         state,
         action: PayloadAction<{ id: string; count: number }>
      ) => {
         const index = state.portfolio.findIndex((item) => item.id === action.payload.id);
         if (state.portfolio[index].count > action.payload.count) {
            state.portfolio[index].count -= action.payload.count;
         } else {
            state.portfolio = state.portfolio.filter(
               (item) => item.id !== action.payload.id
            );
         }
      },
   },
});

export const {} = portfolioSlice.actions;

// Selectors
export const selectPortfolio = (state: RootState) => state.portfolio.portfolio;

export const selectPortfolioById = (id: string) =>
   createSelector(selectPortfolio, (portfolio) =>
      portfolio.find((item) => item.id === id)
   );

export const buyAsset =
   (asset: MarketAssetsToBuy, count: number, price: number): ThunkType =>
   (dispatch) => {
      const item: Portfolio = {
         id: asset.id,
         type: asset.type,
         title: asset.title,
         count: count,
         price: [asset.price[asset.price.length - 1]],
      };
      // добавление в портфель
      dispatch(portfolioSlice.actions.addToPortfolio(item));
      // вычет из баланса
      dispatch(decreaseWallet(price));

      // TODO: если облигации то нужно условие
      // обновление акций на рынке
      dispatch(
         toggleStockCount({
            id: asset.id,
            count,
            type: "decrease",
         })
      );
   };

export const sellAsset =
   (asset: Portfolio, count: number, price: number): ThunkType =>
   (dispatch) => {
      dispatch(
         portfolioSlice.actions.removeFromPortfolio({
            id: asset.id,
            count,
         })
      );
      // обновление баланса
      dispatch(increaseWallet(price));
      // TODO: если облигации то нужно условие
      // обновление акций на рынке
      dispatch(
         toggleStockCount({
            id: asset.id,
            count,
            type: "increase",
         })
      );
   };

export default portfolioSlice.reducer;
