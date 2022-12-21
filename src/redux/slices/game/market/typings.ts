import { assetsFilters, conditions, marketAssets, assetsRisk } from "./models";

export type Condition = conditions.UP | conditions.DOWN | conditions.NOT_CHANGED;

export type MarketAssets =
  | marketAssets.BONDS
  | marketAssets.PORTFOLIO
  | marketAssets.STOCKS;

// export type MarketListAssets = marketAssets.STOCKS | marketAssets.BONDS;

export type AssetsFilter =
  | assetsFilters.CONDITION
  | assetsFilters.COUNT
  | assetsFilters.DIVIDENDS
  | assetsFilters.NONE
  | assetsFilters.PRICE
  | assetsFilters.RISK
  | assetsFilters.TITLE;

export type AssetsRisk =
  | assetsRisk.SUPER_LOW
  | assetsRisk.LOW
  | assetsRisk.MEDIUM
  | assetsRisk.UPPER_MEDIUM
  | assetsRisk.HIGH;
