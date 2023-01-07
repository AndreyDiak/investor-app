import { RootState } from "../../../store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { round } from "../../../../utils";
import { ThunkType } from "../../../store";
import { Expenses } from "../market";
import { Expense } from "./typings";

const mock: Expense[] = [
   {
      type: Expenses.HOME,
      title: "Дом",
      startPrice: 2130,
      remainPrice: 2130,
      paymentPercantage: 8,
   },
   {
      type: Expenses.CAR,
      title: "Машина",
      startPrice: 1640,
      remainPrice: 1640,
      paymentPercantage: 2,
   },
   {
      type: Expenses.CAR,
      title: "Кредитные карты",
      startPrice: 580,
      remainPrice: 580,
      paymentPercantage: 8,
   },
];

const initialState = {
   credits: mock as Expense[],
   total: 248,
};

export const creditSlice = createSlice({
   name: "spendings",
   initialState,
   reducers: {
      setInitialCredits: (state, action: PayloadAction<Expense[]>) => {
         state.credits = action.payload;
         state.total = action.payload.reduce(
            (acc, item) => acc + round((item.paymentPercantage * item.startPrice) / 100),
            0
         );
      },
      updateCredits: (state) => {
         const updated = state.credits
            .filter(
               (spend) =>
                  spend.remainPrice >
                  round((spend.paymentPercantage * spend.startPrice) / 100)
            )
            .map((spend) => ({
               ...spend,
               remainPrice:
                  spend.remainPrice -
                  round((spend.paymentPercantage * spend.startPrice) / 100),
            }));
         state.total =
            updated.length === state.credits.length
               ? state.total
               : updated.reduce(
                    (acc, item) =>
                       acc + round((item.paymentPercantage * item.startPrice) / 100),
                    0
                 );
         state.credits = updated;
      },
      addCredit: (state, action: PayloadAction<Expense>) => {
         const updated = [...state.credits, action.payload];
         state.credits = updated;
         state.total = updated.reduce(
            (acc, item) => acc + round((item.paymentPercantage * item.startPrice) / 100),
            0
         );
      },
   },
});

export const { setInitialCredits, updateCredits, addCredit } = creditSlice.actions;

// Selectors

export const selectCredits = (state: RootState) => state.credit.credits;

export const selectCreditsTotal = (state: RootState) => state.credit.total;

export default creditSlice.reducer;
