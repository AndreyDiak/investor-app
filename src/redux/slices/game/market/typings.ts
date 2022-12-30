import { MarketAssetsType } from "../../../../models/game/market/models";
import { Bond } from "./slices/bonds/typings";
import { Portfolio } from "./slices/portfolio/typings";
import { Stock } from "./slices/stocks/typings";

// виды активов, доступных для покупки
export type Assets = Stock | Bond;
export type AssetsType = MarketAssetsType.STOCKS | MarketAssetsType.BONDS;
// виды активов и личный портфель
export type AllAssets = Assets | Portfolio;
export type AllAssetsType = AssetsType | MarketAssetsType.PORTFOLIO;

export type ToggleAssetCountType = "increase" | "decrease";
