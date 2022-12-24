import { assetsFilters, conditions, marketAssets, assetsRisk } from "./models";
import { Portfolio } from "./portfolio/typings";
import { Stock } from "./stocks/typings";

// цена выросла, упала или не изменилось вовсе
export type Condition = conditions.UP | conditions.DOWN | conditions.NOT_CHANGED;

// вид актива / Акция / что-то из порфтеля
export type AssetsType = Stock | Portfolio;

export type MarketAssetsToBuy = Stock;

export type MarketAssetsToBuyType = marketAssets.BONDS | marketAssets.STOCKS;

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
