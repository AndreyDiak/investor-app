import type {
  HappenedSpend,
  IncreaseSpendsPriceFromDifficultyMap,
  SpendLevelToPriceType,
} from "../../features/slices/spends/typings";

export enum SpendsLevel {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  LUXURY = "luxury",
}

export const spendLevelToPrice: SpendLevelToPriceType = {
  low: 0,
  medium: 1,
  high: 2,
  luxury: 3,
};

// init coefficient of event price increase
export const increaseSpendsPriceFromDifficultyMap: IncreaseSpendsPriceFromDifficultyMap =
  {
    easy: 1.5,
    normal: 2.0,
    hard: 2.5,
  };

export const events: HappenedSpend[] = [
  {
    title: "кинотеатр",
    price: 75,
  },
  {
    title: "ресторан",
    price: 120,
  },
  {
    title: "покупка продуктов",
    price: 65,
  },
  {
    title: "новая одежда",
    price: 90,
  },
  {
    title: "прогулка",
    price: 30,
  },
  {
    title: "ремонт машины",
    price: 220,
  },
  {
    title: "покупка мебели",
    price: 75,
  },
  {
    title: "одолжил другу",
    price: 30,
  },
  {
    title: "благотворительность",
    price: 40,
  },
  {
    title: "поход в ТЦ",
    price: 80,
  },
  {
    title: "оплата подписки",
    price: 45,
  },
  {
    title: "игра любимой команды",
    price: 120,
  },
  {
    title: "встреча с друзьями",
    price: 70,
  },
  {
    title: "помощь родителям",
    price: 100,
  },
  {
    title: "улучшение рабочего места",
    price: 110,
  },
];
