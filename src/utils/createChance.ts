import { generateRandomValue } from "./generateRandom";

export const createChance = (count = 0.5) => generateRandomValue() > count;
