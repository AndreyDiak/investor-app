import { roundMultiply } from "./roundMultiply";
// return value from 0 to max - 1
// if max === 3 return 0 / 1 / 2 ...
export const generateRoundRandomValue = (max: number) => Math.floor(Math.random() * max);

export const generateRandomValue = (max = 1) => roundMultiply(Math.random() * max);
