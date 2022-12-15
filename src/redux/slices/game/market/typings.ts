import { assetsFilters, conditions, marketFilters, assetsRisk } from "./models";

export type Condition = conditions.UP | conditions.DOWN | conditions.NOT_CHANGED;

export type MarketFilters =
  | marketFilters.BONDS
  | marketFilters.PORTFOLIO
  | marketFilters.STOCKS;

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
