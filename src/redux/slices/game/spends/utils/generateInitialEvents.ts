import { events, increaseSpendsPriceFromDifficultyMap } from "../../../../../models";
import { DifficultyType } from "../../../settings/typings";
import { Spend } from "../typings";

export const generateInitialEvents = (difficulty: DifficultyType) => {
  const difficultyCoefficient = increaseSpendsPriceFromDifficultyMap[difficulty];
  const availableEvents: Spend[] = events.map((event) => {
    // задаем цены с учетом сложности игры
    const lowPrice = event.price;
    const mediumPrice = Math.floor(lowPrice * difficultyCoefficient);
    const highPrice = Math.floor(mediumPrice * difficultyCoefficient);
    const luxuryPrice = Math.floor(highPrice * difficultyCoefficient);

    return {
      title: event.title,
      price: [lowPrice, mediumPrice, highPrice, luxuryPrice],
    };
  });
  return availableEvents;
};
