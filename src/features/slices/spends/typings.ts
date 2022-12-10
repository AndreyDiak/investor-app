import { DifficultyType } from "../settings/typings";
import { SpendsLevel } from "./models";

export interface Spend {
  title: string;
  price: number[];
}

export interface HappenedSpend {
  title: string;
  price: number;
}

export type SpendsLevelType =
  | SpendsLevel.LOW
  | SpendsLevel.MEDIUM
  | SpendsLevel.HIGH
  | SpendsLevel.LUXURY;

export type SpendLevelToPriceType = {
  [level in SpendsLevelType]: number;
};

export type IncreaseSpendsPriceFromDifficultyMap = {
  [difficulty in DifficultyType]: number;
};
