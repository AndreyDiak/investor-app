import { DifficultyType } from "../settings/typings";
import { Expenses } from "../../../models";

export interface InitialPerson {
  name: string;
  age: number;
  work: string;
  photo: {
    img: string;
    avatar: string;
  };
}

export interface Person extends InitialPerson {
  salary: number; // зарплата
  startMoney: number; // стартовые сбережения
  difficulty: DifficultyType;
  spendings: Expense[];
  spendingsMonthPayment: number;
}

export type ExpenseType = Expenses.CAR | Expenses.HOME | Expenses.CREDIT_CARD;

export type ExpenseTitleMapType = {
  [title in ExpenseType]: string;
};

export type DefaultExpensesPrices = {
  [title in ExpenseType]: number;
};

export type DifficultyCoefficientMapType = {
  [difficulty in DifficultyType]: number;
};

export interface Expense {
  type: ExpenseType;
  title: string;
  startPrice: number;
  remainPrice: number;
  paymentPercantage: number;
}
