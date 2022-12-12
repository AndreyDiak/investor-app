import { difficulty, GameDuration, timeSpeed } from "../../../models";

export type DifficultyType = difficulty.EASY | difficulty.MEDIUM | difficulty.HARD;

export type GameDurationType =
  | GameDuration.FAST
  | GameDuration.NORMAL
  | GameDuration.LONG;

export type TimeSpeedType =
  | timeSpeed.FAST
  | timeSpeed.MEDIUM
  | timeSpeed.SLOW
  | timeSpeed.STOP;
