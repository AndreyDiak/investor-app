import { uuid } from "uuidv4";
import { companiesForStocks } from "../../../../../../models";
import { numberToRisk } from "../../../../../../utils/market/numberToRisk";
import { DifficultyType } from "../../../../settings/typings";
import {
  assetsDiffToNormalPriceChangeMap,
  assetsDiffToPriceMap,
  conditions,
  defaultMinPrice,
  stocksDiffToDividendsChance,
} from "../../models";
import { Stock } from "../typings";
import { createChance } from "./../../../../../../utils/createChance";
import { generateRoundRandomValue } from "./../../../../../../utils/generateRandom";

export const generateStocks = (difficulty: DifficultyType) => {
  const normalPriceChange = assetsDiffToNormalPriceChangeMap[difficulty];
  const priceCoefficient = assetsDiffToPriceMap[difficulty];
  const dividendsChance = stocksDiffToDividendsChance[difficulty];

  return companiesForStocks.map((company) => {
    const risk = numberToRisk(generateRoundRandomValue(4));
    // возможно стоит придумать более тонкую настройку
    const minPrice =
      generateRoundRandomValue(defaultMinPrice) + defaultMinPrice / normalPriceChange; // минимальная цена за акцию

    const price = minPrice + generateRoundRandomValue(minPrice * priceCoefficient);

    const dividends = createChance(dividendsChance)
      ? 0 // нет дивидендов
      : generateRoundRandomValue(normalPriceChange - 1) + 1; // процент дивов

    const count = generateRoundRandomValue(50) + 50; // от 50 до 100 акций на рынке

    const stock: Stock = {
      id: "",
      title: company,
      count: count,
      risk: risk,
      price: [price],
      condition: conditions.NOT_CHANGED, // начальная цена не меняется
      priceChangeDueToNews: 0, // новости не влияют на акцию
      dividendsPercentage: dividends,
      minPrice: minPrice,
    };

    return stock;
  });
};
