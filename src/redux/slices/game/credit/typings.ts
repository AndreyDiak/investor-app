import { Expenses } from "../market";

export interface Expense {
   type: Expenses;
   title: string;
   startPrice: number;
   remainPrice: number;
   paymentPercantage: number;
}
