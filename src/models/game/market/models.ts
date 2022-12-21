import { marketAssets } from "../../../redux/slices/game/market/models";

// TODO: возможно, облигации будут открываться позже
// и тогда нужно делать какой либо ableToShow, который
// будет обновлятся

export const optionsMarketFilters = [
  {
    label: "Портфель",
    to: marketAssets.PORTFOLIO,
  },
  {
    label: "Акции",
    to: marketAssets.STOCKS,
  },
  {
    label: "Облигации",
    to: marketAssets.BONDS,
  },
];
