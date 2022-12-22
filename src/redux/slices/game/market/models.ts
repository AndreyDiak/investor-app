export enum assetsFilters {
  PRICE = "price",
  CONDITION = "condition",
  TITLE = "title",
  COUNT = "count",
  NONE = "none",
  RISK = "risk",
  DIVIDENDS = "dividends",
}

export enum assetsRisk {
  SUPER_LOW = "super-low",
  LOW = "low",
  MEDIUM = "medium",
  UPPER_MEDIUM = "upper-medium",
  HIGH = "high",
}

export enum conditions {
  UP = "up",
  DOWN = "down",
  NOT_CHANGED = "not-changed",
}

export enum marketAssets {
  PORTFOLIO = "portfolio",
  STOCKS = "stocks",
  BONDS = "bonds",
}

export const marketFiltersToLabelMap = {
  stocks: "Акции",
  bonds: "Облигации",
};

export const defaultMinPrice = 35;
export const defaultAssetsCountChange = 10;
export const priceNotChangeChance = 0.1;
// коеффициент для создания минимальной цены акции
// изменения цены
// макс процент дивидендов с акции
export const assetsDiffToNormalPriceChangeMap = {
  easy: 5,
  normal: 4,
  hard: 3,
};

// во сколько стартовая цена может отличатся от начально
export const assetsDiffToPriceMap = {
  easy: 4,
  normal: 5,
  hard: 6,
};

// процент на то, что акция будет иметь дивиденды
export const stocksDiffToDividendsChance = {
  easy: 0.3,
  normal: 0.2,
  hard: 0.1,
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
