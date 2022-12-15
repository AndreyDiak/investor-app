import { uuid } from "uuidv4";
import { companiesForStocks } from "../../../../../../models";
import { numberToRisk } from "../../../../../../utils/market/numberToRisk";
import { DifficultyType } from "../../../../settings/typings";
import {
  assetsDiffToNormalPriceChangeMap,
  assetsDiffToPriceMap,
  assetsRiskToConditionMap,
  conditions,
  defaultAssetsCountChange,
  defaultMinPrice,
  priceNotChangeChance,
  stocksDiffToDividendsChance
} from "../../models";
import { Condition } from "../../typings";
import { Stock } from "../typings";
import { createChance } from "./../../../../../../utils/createChance";
import {
  generateRoundRandomValue
} from "./../../../../../../utils/generateRandom";

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
      id: uuid(),
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
      // новая цена на акцию
      const priceDiffCoefficient = Number(
        (
          priceDiffFromRisk.down / 10 +
          normalPriceChange +
          normalPriceChange / 100
        ).toFixed(2)
      );
      // можно ли понизить цену?
      const isAbleToDecrease =
        stock.priceChangeDueToNews === 0
          ? lastPrice * (1 - priceDiffCoefficient) > stock.minPrice
          : false;

      newPrice = isAbleToDecrease
        ? createChance(priceDiffFromRisk.up)
          ? lastPrice + lastPrice * priceDiffCoefficient
          : lastPrice - lastPrice * priceDiffCoefficient
        : lastPrice + lastPrice * priceDiffCoefficient;
      condition = lastPrice > newPrice ? conditions.DOWN : conditions.UP;
    } else {
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
      price: [...stock.price, newPrice],
      condition,
      priceChangeDueToNews:
        stock.priceChangeDueToNews !== 0 ? stock.priceChangeDueToNews - 1 : 0,
    };
  });
};
