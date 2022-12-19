import { createChance } from "../../../../../../utils/createChance";
import {
  generateRandomValue,
  generateRoundRandomValue,
} from "../../../../../../utils/generateRandom";
import { DifficultyType } from "../../../../settings/typings";
import {
  assetsDiffToNormalPriceChangeMap,
  assetsRiskToConditionMap,
  conditions,
  defaultAssetsCountChange,
  priceNotChangeChance,
} from "../../models";
import { Condition } from "../../typings";
import { Stock } from "../typings";

export const indexingStocks = (stocks: Stock[], difficulty: DifficultyType) => {
  const normalPriceChange = assetsDiffToNormalPriceChangeMap[difficulty];

  return stocks.map((stock) => {
    const countDifference = generateRoundRandomValue(defaultAssetsCountChange);
    // последняя цена на акцию
    const lastPrice = stock.price[stock.price.length - 1];

    let newPrice: number;
    let condition: Condition;

    // шанс 10 процентов на то, что цена не изменится
    if (createChance(priceNotChangeChance)) {
      // вероятность повышения / понижения
      const priceDiffFromRisk = assetsRiskToConditionMap[stock.risk];
      // новая цена на акцию ( коэф )
      const priceDiffCoefficient = Number(
        (
          priceDiffFromRisk.down / 10 +
          generateRandomValue(normalPriceChange / 100)
        ).toFixed(2)
      );

      // если это акция подвержена новости
      if (stock.priceChangeIntervalDueToNews !== 0) {
        // рост или падение
        const growOrFall = stock.priceGrowOfFallDueToNews;
        // новая цена
        newPrice =
          growOrFall === conditions.UP
            ? lastPrice + lastPrice * priceDiffCoefficient
            : lastPrice - lastPrice * priceDiffCoefficient;
        // сетаем состояние акции
        condition = stock.condition === growOrFall ? stock.condition : growOrFall;
      } else {
        // можно ли понизить цену?
        const isAbleToDecrease =
          stock.priceChangeIntervalDueToNews === 0
            ? lastPrice * (1 - priceDiffCoefficient) > stock.minPrice
            : false;
        // новая цена
        newPrice = isAbleToDecrease
          ? createChance(priceDiffFromRisk.up)
            ? lastPrice + lastPrice * priceDiffCoefficient
            : lastPrice - lastPrice * priceDiffCoefficient
          : lastPrice + lastPrice * priceDiffCoefficient;
        // сетаем состояние акции
        condition = lastPrice > newPrice ? conditions.DOWN : conditions.UP;
      }
    } else {
      // цена не меняется
      newPrice = lastPrice;
      condition = conditions.NOT_CHANGED;
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
      price: [...stock.price, Number(newPrice.toFixed(1))],
      condition,
      priceChangeDueToNews:
        stock.priceChangeIntervalDueToNews !== 0
          ? stock.priceChangeIntervalDueToNews - 1
          : 0,
    };
  });
};
