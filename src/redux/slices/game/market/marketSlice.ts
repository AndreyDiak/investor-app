import { createSelector } from "@reduxjs/toolkit";

import { MarketAssetsType } from "../../../../models";
import { ThunkType } from "../../../store";
import { selectBonds, selectStocks, toggleStockCount } from "./slices";
import { AllAssetsType, ToggleAssetCountType } from "./typings";

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
