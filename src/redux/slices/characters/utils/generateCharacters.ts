import { enum2array } from "enum2array";
import { generateRandomValue, generateRoundRandomValue, round } from "../../../../utils";
import {
   defaultSalary,
   defaultSpendingsMaxPaymentPercantage,
   defaultSpendingsMinPaymentPercantage,
   defaultSpendingsPrices,
   defaultStartMoney,
   difficultyMap,
   difficultySalaryCoefficient,
   difficultySpendingsCoefficient,
   difficultyStaryMoneyCoefficient,
   Expenses,
   expensesTitleMap,
   initialCharacters,
} from "../../../../models";
import { Person } from "../typings";
import { Expense } from "../../game";

// Generate characters
export const generateCharacters = () => {
   const characters: Person[] = initialCharacters.map((character) => {
      const characterDifficulty = generateRoundRandomValue(3) as 0 | 1 | 2;
      const characterDifficultyValue = difficultyMap[characterDifficulty];

      // generate spendings
      const expenses: Expense[] = [Expenses.HOME, Expenses.CAR, Expenses.CREDIT_CARD].map(
         (value) => {
            const difficultySpendingsCoefficientMin =
               difficultySpendingsCoefficient[characterDifficultyValue][0];

            const difficultySpendingsCoefficientMax =
               difficultySpendingsCoefficient[characterDifficultyValue][1];

            const totalCoefficient =
               difficultySpendingsCoefficientMin +
               generateRandomValue(
                  difficultySpendingsCoefficientMax - difficultySpendingsCoefficientMin
               );

            const price = round(defaultSpendingsPrices[value] * totalCoefficient, 0);

            const paymentPercantage =
               defaultSpendingsMinPaymentPercantage +
               generateRoundRandomValue(
                  defaultSpendingsMaxPaymentPercantage -
                     defaultSpendingsMinPaymentPercantage
               );
            // return spendings
            return {
               type: value,
               title: expensesTitleMap[value],
               startPrice: price,
               remainPrice: price,
               paymentPercantage,
            };
         }
      );

      // суммарный платеж по всем кредитам
      const expensesSummaryMonthPayment = expenses.reduce(
         (total, item) =>
            Math.floor(total + (item.paymentPercantage * item.startPrice) / 100),
         0
      );

      // generate salary
      const salaryMinValue =
         defaultSalary * difficultySalaryCoefficient[characterDifficultyValue];
      const salaryMaxValue =
         defaultStartMoney * difficultySalaryCoefficient[characterDifficultyValue];

      const salary =
         salaryMinValue +
         generateRoundRandomValue(salaryMaxValue - salaryMinValue) +
         expensesSummaryMonthPayment;

      // generate start money
      const startMoney =
         salary +
         defaultStartMoney * difficultyStaryMoneyCoefficient[characterDifficultyValue] -
         expensesSummaryMonthPayment;

      // return character
      return {
         ...character,
         salary,
         startMoney,
         difficulty: characterDifficultyValue,
         spendings: expenses,
         spendingsMonthPayment: expensesSummaryMonthPayment,
      };
   });

   return characters;
};
