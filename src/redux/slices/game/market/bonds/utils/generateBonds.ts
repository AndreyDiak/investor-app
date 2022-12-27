import {
   generateRandomValue,
   generateRoundRandomValue,
} from "./../../../../../../utils/generateRandom";
import { companiesForBonds } from "../../../../../../models";
import { DifficultyType } from "../../../../settings/typings";
import { numberToRisk } from "../../../../../../utils/market/numberToRisk";
import { assetsDiffToNormalPriceChangeMap, assetsDiffToPriceMap } from "../../models";
import { defaultBondMinPrice } from "../models";

export const generateBonds = (difficulty: DifficultyType) => {
   // количество облигаций
   const bondsCount = generateRoundRandomValue(15) + 5;
   const normalPriceChange = assetsDiffToNormalPriceChangeMap[difficulty];
   const priceCoefficient = assetsDiffToPriceMap[difficulty];

   return Array(bondsCount).map(() => {
      const company =
         companiesForBonds[generateRoundRandomValue(companiesForBonds.length)];

      const companyFullName =
         generateRandomValue() > 0.5
            ? "ОФЗ-" + (generateRoundRandomValue(100) + 100) + " " + company
            : "Выпуск " + (generateRoundRandomValue(9) + 1) + " " + company;

      const risk = numberToRisk(generateRoundRandomValue(4));

      const minPrice =
         generateRoundRandomValue(defaultBondMinPrice) +
         defaultBondMinPrice / normalPriceChange;

      const price = minPrice + generateRoundRandomValue(minPrice * priceCoefficient);
   });
};
