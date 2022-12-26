import { selectStocks, toggleStockCount } from "./stocks/stocksSlice";
import { createSelector } from "@reduxjs/toolkit";
import { selectBonds } from "./bonds/bondsSlice";
import { MarketAssetsToBuyType, ToggleAssetCountType } from "./typings";
import { ThunkType } from "../../../store";
import { marketAssets } from "./models";

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
      assetType: MarketAssetsToBuyType,
      count: number,
      type: ToggleAssetCountType
   ): ThunkType =>
   (dispatch) => {
      switch (assetType) {
         case marketAssets.STOCKS:
            dispatch(toggleStockCount({ id: assetId, count, type }));
            break;
         case marketAssets.BONDS:
            break;
         default:
            return null;
      }
   };
