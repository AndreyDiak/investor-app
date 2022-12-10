import { enum2array } from "enum2array";
import { generateRandomNumber } from "../../../../utils/generateRandomNumber";
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
} from "../models";
import { Expense, ExpenseType, Person } from "../typings";

// Generate characters
export const generateCharacters = () => {
  const characters: Person[] = initialCharacters.map((character) => {
    const characterDifficulty = generateRandomNumber(3) as 0 | 1 | 2;
    const characterDifficultyValue = difficultyMap[characterDifficulty];

    // generate salary
    const salaryMinValue =
      defaultSalary * difficultySalaryCoefficient[characterDifficultyValue];
    const salaryMaxValue =
      defaultStartMoney * difficultySalaryCoefficient[characterDifficultyValue];

    const salary = salaryMinValue + generateRandomNumber(salaryMaxValue - salaryMinValue);

    // generate start money
    const startMoney =
      salary +
      defaultStartMoney * difficultyStaryMoneyCoefficient[characterDifficultyValue];

    // generate spendings
    const expenses: Expense[] = enum2array(Expenses).map(({ title, value }) => {
      const price =
        defaultSpendingsPrices[value as ExpenseType] *
        difficultySpendingsCoefficient[characterDifficultyValue];
      const paymentPercantage =
        defaultSpendingsMinPaymentPercantage +
        generateRandomNumber(
          defaultSpendingsMaxPaymentPercantage - defaultSpendingsMinPaymentPercantage
        );
      // return spendings
      return {
        type: value as ExpenseType,
        title: expensesTitleMap[value as ExpenseType],
        startPrice: price,
        remainPrice: price,
        paymentPercantage,
      };
    });
    // return character
    return {
      ...character,
      salary,
      startMoney,
      difficulty: characterDifficultyValue,
      spendings: expenses,
    };
  });

  return characters;
};
