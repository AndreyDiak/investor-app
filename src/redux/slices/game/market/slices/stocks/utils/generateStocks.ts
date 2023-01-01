import { v4 as uuidv4 } from "uuid";
import {
   companiesForStocks,
   Difficulty,
   Conditions,
   MarketAssetsType,
} from "../../../../../../../models";
import {
   numberToRisk,
   createChance,
   generateRoundRandomValue,
} from "../../../../../../../utils";

import {
   defaultStockCountChange,
   defaultStockMinPrice,
   stocksDiffToDividendsChance,
   stocksDiffToNormalPriceChangeMap,
   stocksDiffToPriceMap,
} from "../models";
import { Stock } from "../typings";

export const generateStocks = (difficulty: Difficulty) => {
   // коеффициент изменения цены
   const normalPriceChange = stocksDiffToNormalPriceChangeMap[difficulty];
   // различие в X минимальной цены и начальной
   const priceCoefficient = stocksDiffToPriceMap[difficulty];
   // шанс на то, что у акции будут дивиденды
   const dividendsChance = stocksDiffToDividendsChance[difficulty];

   return companiesForStocks.map((company) => {
      const risk = numberToRisk(generateRoundRandomValue(4));
      // минимальная цена за акцию
      const minPrice =
         defaultStockMinPrice +
         generateRoundRandomValue(defaultStockMinPrice / normalPriceChange);

      const price = minPrice + generateRoundRandomValue(minPrice * priceCoefficient);

      const dividends = createChance(dividendsChance)
         ? 0 // нет дивидендов
         : generateRoundRandomValue(normalPriceChange - 1) + 1; // процент дивов

      const count = generateRoundRandomValue(100) + defaultStockCountChange; // от 10 до 110 акций на рынке

      const stock: Stock = {
         id: uuidv4(),
         type: MarketAssetsType.STOCKS,
         title: company,
         count: count,
         risk: risk,
         price: [price],
         condition: Conditions.NOT_CHANGED, // начальная цена не меняется
         priceChangeIntervalDueToNews: 0, // новости не влияют на акцию
         priceGrowOfFallDueToNews: Conditions.NOT_CHANGED,
         dividendsPercentage: dividends,
         minPrice: minPrice,
      };

      return stock;
   });
};
