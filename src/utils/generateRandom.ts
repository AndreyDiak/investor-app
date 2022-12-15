// return value from 0 to max - 1
// if max === 3 return 0 / 1 / 2 ...
export const generateRoundRandomValue = (max: number) => Math.floor(Math.random() * max);

export const generateRandomValue = (max = 1) => Number((Math.random() * max).toFixed(2));
