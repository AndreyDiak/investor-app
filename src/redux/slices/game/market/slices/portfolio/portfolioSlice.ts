import { selectStocks, selectStocksWithDividends } from "./../stocks/stocksSlice";
import { round } from "./../../../../../../utils";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MarketAssetsType } from "../../../../../../models";
import { RootState, ThunkType } from "../../../../../store";
import { decreaseWallet, increaseWallet } from "../../../character/characterSlice";
import { toggleMarketAssetsCount } from "../../marketSlice";
import { AllAssetsType, Assets } from "../../typings";
import type { Portfolio } from "./typings";
import { Stock } from "../stocks";

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

const selectPortfolioWithDividends = createSelector(selectPortfolio, (portfolio) =>
   portfolio.filter((item) => !!item.isDividends)
);

export const selectPortfolioStocksWithDividends = createSelector(
   [selectPortfolioWithDividends, selectStocksWithDividends],
   (portfolio, stocks) => {
      return {
         title: "Акции",
         payment: portfolio.reduce((acc, item) => {
            const stock = stocks.find((s) => s.id === item.id)!;
            return (
               acc +
               round(
                  (stock.dividendsPercentage * // процент на дивы
                     stock.price[stock.price.length - 1] * // последняя цена
                     item.count) / // количество акций в портфеле
                     100
               )
            );
         }, 0),
      };
   }
);

export const selectPortfolioById = (id: string) =>
   createSelector(selectPortfolio, (portfolio) =>
      portfolio.find((item) => item.id === id)
   );

export const buyAsset =
   (asset: Assets, count: number, price: number): ThunkType =>
   (dispatch) => {
      const item: Portfolio = {
         id: asset.id,
         type: MarketAssetsType.PORTFOLIO,
         title: asset.title,
         count: count,
         price: [asset.price[asset.price.length - 1]],
         isDividends: asset.dividendsPercentage !== 0,
      };
      // добавление в портфель
      dispatch(portfolioSlice.actions.addToPortfolio(item));
      // вычет из баланса
      dispatch(decreaseWallet(price));
      // обновление акций на рынке
      dispatch(toggleMarketAssetsCount(asset.id, asset.type, count, "decrease"));
   };

export const sellAsset =
   (assetId: string, assetType: AllAssetsType, count: number, price: number): ThunkType =>
   (dispatch) => {
      dispatch(
         portfolioSlice.actions.removeFromPortfolio({
            id: assetId,
            count,
         })
      );
      // обновление баланса
      dispatch(increaseWallet(price));
      // обновление акций на рынке
      dispatch(toggleMarketAssetsCount(assetId, assetType, count, "increase"));
   };

export default portfolioSlice.reducer;
