import { devices, difficulty, GameDuration, timeSpeed } from "../../../models";

export type DifficultyType = difficulty.EASY | difficulty.MEDIUM | difficulty.HARD;

export type DeviceType =
  | devices.DESKTOP
  | devices.LAPTOP
  | devices.PHONE
  | devices.TABLET;

export type GameDurationType =
  | GameDuration.FAST
  | GameDuration.NORMAL
  | GameDuration.LONG;

export type TimeSpeedType =
  | timeSpeed.FAST
  | timeSpeed.MEDIUM
  | timeSpeed.SLOW
  | timeSpeed.STOP;
