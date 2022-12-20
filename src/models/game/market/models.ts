import { marketFilters } from "../../../redux/slices/game/market/models";

// TODO: возможно, облигации будут открываться позже
// и тогда нужно делать какой либо ableToShow, который
// будет обновлятся

export const optionsMarketFilters = [
  {
    label: "Портфель",
    to: marketFilters.PORTFOLIO,
  },
  {
    label: "Акции",
    to: marketFilters.STOCKS,
  },
  {
    label: "Облигации",
    to: marketFilters.BONDS,
  },
];
