import { createSelector, createSlice } from "@reduxjs/toolkit";

import { defaultMarketLevel, MarketAssetsType, MarketLevels } from "../../../../models";
import { ThunkType } from "../../../store";
import { selectBonds, selectStocks, toggleStockCount } from "./slices";
import { AllAssetsType, ToggleAssetCountType } from "./typings";

const initialState = {
   level: defaultMarketLevel,
};

export const marketSlice = createSlice({
   name: "market",
   initialState,
   reducers: {
      upgradeMarketLevel: (state) => {
         if (state.level === MarketLevels.GARBAGE) {
            state.level = MarketLevels.MEDIUM;
         } else if (state.level === MarketLevels.MEDIUM) {
            state.level = MarketLevels.PREMIUM;
         }
      },
   },
});

// Selectors
export const selectMarketAssets = createSelector(
   [selectStocks, selectBonds],
   (stocks, bonds) => [...stocks, ...bonds]
);

export const selectMarketAssetById = (id: string) =>
   createSelector(
      selectMarketAssets,
      (assets) => assets.find((asset) => asset.id === id)!
   );

// Thunks
export const toggleMarketAssetsCount =
   (
      assetId: string,
      assetType: AllAssetsType,
      count: number,
      type: ToggleAssetCountType
   ): ThunkType =>
   (dispatch) => {
      switch (assetType) {
         case MarketAssetsType.STOCKS:
            dispatch(toggleStockCount({ id: assetId, count, type }));
            break;
         case MarketAssetsType.BONDS:
            break;
         default:
            return null;
      }
   };

// TODO : написать функцию которая будет улучшать уровень маркета
// а также придумать какие либо условия для повышения этого уровня
// например : купить X акций, заплатить Х денег и тогда новый уровень

// при покупке доступа к новому рынку мы генерим новые акции в зависимости от уровня
// надо сделать какую-нибудь модалку
