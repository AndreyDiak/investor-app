import { v4 as uuidv4 } from "uuid";
import { companiesForStocks } from "../../../../../../models";
import { numberToRisk } from "../../../../../../utils/market/numberToRisk";
import { DifficultyType } from "../../../../settings/typings";
import {
   assetsDiffToNormalPriceChangeMap,
   assetsDiffToPriceMap,
   conditions,
   marketAssets,
   stocksDiffToDividendsChance,
} from "../../models";
import { defaultStockMinPrice } from "../models";
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
         generateRoundRandomValue(defaultStockMinPrice) +
         defaultStockMinPrice / normalPriceChange; // минимальная цена за акцию

      const price = minPrice + generateRoundRandomValue(minPrice * priceCoefficient);

      const dividends = createChance(dividendsChance)
         ? 0 // нет дивидендов
         : generateRoundRandomValue(normalPriceChange - 1) + 1; // процент дивов

      const count = generateRoundRandomValue(100) + 10; // от 10 до 110 акций на рынке

      const stock: Stock = {
         id: uuidv4(),
         type: marketAssets.STOCKS,
         title: company,
         count: count,
         risk: risk,
         price: [price],
         condition: conditions.NOT_CHANGED, // начальная цена не меняется
         priceChangeIntervalDueToNews: 0, // новости не влияют на акцию
         priceGrowOfFallDueToNews: conditions.NOT_CHANGED,
         dividendsPercentage: dividends,
         minPrice: minPrice,
      };

      return stock;
   });
};
