import { difficulty, timeSpeed } from "./models";

export type DifficultyType =
  | difficulty.EASY
  | difficulty.MEDIUM
  | difficulty.HARD;

export type TimeSpeedType =
  | timeSpeed.FAST
  | timeSpeed.MEDIUM
  | timeSpeed.SLOW
  | timeSpeed.STOP;
