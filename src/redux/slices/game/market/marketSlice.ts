import { createSelector } from "@reduxjs/toolkit";

import { ThunkType } from "../../../store";
import { AssetsFilter, MarketAssetsType } from "../../../../models";
import {
   selectBonds,
   selectFilteredStocks,
   selectStocks,
   toggleStockCount,
} from "./slices";
import { AllAssetsType, AssetsType, ToggleAssetCountType } from "./typings";

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
