import {
   generateRandomValue,
   generateRoundRandomValue,
   roundMultiply,
   createChance,
} from "../../../../../../../utils";
import {
   defaultStockCountChange,
   defaultStockPriceNotChangeChance,
   stocksDiffToNormalPriceChangeMap,
} from "../models";
import { Stock } from "../typings";
import {
   assetsRiskToConditionMap,
   Conditions,
   Difficulty,
} from "../../../../../../../models";

export const indexingStocks = (stocks: Stock[], difficulty: Difficulty) => {
   const normalPriceChange = stocksDiffToNormalPriceChangeMap[difficulty];

   return stocks.map((stock) => {
      const countDifference = generateRoundRandomValue(defaultStockCountChange);
      // последняя цена на акцию
      const lastPrice = stock.price[stock.price.length - 1];

      let newPrice: number;
      let condition: Conditions;

      let priceChangeIntervalDueToNews = stock.priceChangeIntervalDueToNews;
      let priceGrowOfFallDueToNews = stock.priceGrowOfFallDueToNews;

      // шанс 10 процентов на то, что цена не изменится
      // работает всегда, даже если на акцию влияет новость
      if (createChance(defaultStockPriceNotChangeChance)) {
         // вероятность повышения / понижения
         const priceDiffFromRisk = assetsRiskToConditionMap[stock.risk];
         // новая цена на акцию ( коэф )
         const priceDiffCoefficient = roundMultiply(
            priceDiffFromRisk.down / 10 + generateRandomValue(normalPriceChange / 100)
         );

         // если это акция подвержена новости
         if (priceChangeIntervalDueToNews !== 0) {
            // рост или падение
            const growOrFall = priceGrowOfFallDueToNews;
            // новая цена
            newPrice =
               growOrFall === Conditions.UP
                  ? lastPrice + lastPrice * priceDiffCoefficient
                  : lastPrice - lastPrice * priceDiffCoefficient;
            // сетаем состояние акции
            condition = stock.condition === growOrFall ? stock.condition : growOrFall;
            // уменьшаем срок подвержения на одну неделю
            priceChangeIntervalDueToNews--;
            if (priceChangeIntervalDueToNews === 0) {
               priceGrowOfFallDueToNews = Conditions.NOT_CHANGED;
            }
         } else {
            // можно ли понизить цену
            // если нет то заставляем расти акцию
            if (lastPrice * (1 - priceDiffCoefficient) < stock.minPrice) {
               // вручную заставляем заставляем расти акцию
               // в течение 2-4 недель
               priceChangeIntervalDueToNews = generateRoundRandomValue(3) + 2;
               priceGrowOfFallDueToNews = Conditions.UP;

               newPrice = lastPrice + lastPrice * priceDiffCoefficient;
               condition = Conditions.UP;
            } else {
               // можно понизить цену
               // новая цена, либо рост либо падание
               // все зависит от шанса акции на рост
               // что в свою очередь зависит от риска акции
               newPrice = createChance(priceDiffFromRisk.up)
                  ? lastPrice + lastPrice * priceDiffCoefficient
                  : lastPrice - lastPrice * priceDiffCoefficient;
               // сетаем состояние акции
               condition = lastPrice > newPrice ? Conditions.DOWN : Conditions.UP;
            }
         }
      } else {
         // цена не меняется
         newPrice = lastPrice;
         condition = Conditions.NOT_CHANGED;
      }

      return {
         ...stock,
         // если новое кол-во акций меньше 0 то в любом случае увеличиваем их кол-во
         // если больше 0 то рандомим событие
         count:
            stock.count - countDifference > 0
               ? createChance()
                  ? stock.count + countDifference
                  : stock.count - countDifference
               : stock.count + countDifference,
         price: [...stock.price, roundMultiply(newPrice, 1)],
         condition,
         priceChangeIntervalDueToNews,
         priceGrowOfFallDueToNews,
      };
   });
};
