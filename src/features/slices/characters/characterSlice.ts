import { AnyAction, createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { generateRandomNumber } from "../../../utils/generateRandomNumber";
import { RootState } from "../../store";
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
} from "./models";
import { Expense, ExpenseType, Person } from "./typings";

const initialState = {
  characters: [] as Person[],
};

// export type SettingsState = typeof initialState;

export const characterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<Person[]>) => {
      state.characters = action.payload;
    },
  },
  extraReducers: {},
});

// Selectors
export const selectCharacters = (state: RootState) => state.characters.characters;

type ThunkType = ThunkAction<void, RootState, unknown, AnyAction>;

// Generate characters
export const generateCharacters = (): ThunkType => (dispatch) => {
  console.log("hello");
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
    const expenses: Expense[] = Object.keys(Expenses).map((expense) => {
      const price =
        defaultSpendingsPrices[expense as ExpenseType] *
        difficultySpendingsCoefficient[characterDifficultyValue];
      const paymentPercantage =
        defaultSpendingsMinPaymentPercantage +
        generateRandomNumber(
          defaultSpendingsMaxPaymentPercantage - defaultSpendingsMinPaymentPercantage
        );
      return {
        type: expense as ExpenseType,
        title: expensesTitleMap[expense as ExpenseType],
        startPrice: price,
        remainPrice: price,
        paymentPercantage,
      };
    });

    return {
      ...character,
      salary,
      startMoney,
      difficulty: characterDifficultyValue,
      spendings: expenses,
    };
  });

  dispatch(characterSlice.actions.setCharacters(characters));
};

export default characterSlice.reducer;
