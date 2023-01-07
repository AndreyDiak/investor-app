import { Difficulty } from "../../../models";
import { Expense } from "../game/credit/typings";

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
   difficulty: Difficulty;
   spendings: Expense[];
   spendingsMonthPayment: number;
}
