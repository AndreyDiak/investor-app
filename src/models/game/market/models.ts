export enum AssetsFilter {
   PRICE = "price",
   CONDITION = "condition",
   TITLE = "title",
   COUNT = "count",
   NONE = "none",
   RISK = "risk",
   DIVIDENDS = "dividends",
}

export enum AssetsRisk {
   SUPER_LOW = "super-low",
   LOW = "low",
   MEDIUM = "medium",
   UPPER_MEDIUM = "upper-medium",
   HIGH = "high",
}

export enum Conditions {
   UP = "up",
   DOWN = "down",
   NOT_CHANGED = "not-changed",
}

export enum MarketAssetsType {
   PORTFOLIO = "portfolio",
   STOCKS = "stocks",
   BONDS = "bonds",
}

export const marketFiltersToLabelMap = {
   stocks: "Акции",
   bonds: "Облигации",
};

export const assetsRiskToConditionMap = {
   "super-low": { up: 0.7, down: 0.3 },
   low: { up: 0.6, down: 0.4 },
   medium: { up: 0.5, down: 0.5 },
   "upper-medium": { up: 0.4, down: 0.6 },
   high: { up: 0.3, down: 0.7 },
};

export const incomeToOpenMarket = {
   stocks: 500,
   bonds: 1300,
};

// TODO: возможно, облигации будут открываться позже
// и тогда нужно делать какой либо ableToShow, который
// будет обновлятся

export const optionsMarketFilters = [
   {
      label: "Портфель",
      to: MarketAssetsType.PORTFOLIO,
   },
   {
      label: "Акции",
      to: MarketAssetsType.STOCKS,
   },
   {
      label: "Облигации",
      to: MarketAssetsType.BONDS,
   },
];
