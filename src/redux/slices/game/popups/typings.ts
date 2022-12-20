import { popups } from "./models";

export type PopupsType =
  | popups.STOCK
  | popups.MY_STOCK
  // | popups.BROKER
  | popups.REALTY_BUY
  | popups.REALTY_SELL
  // | popups.MARGIN
  | popups.HISTORY
  | popups.MARKET;
