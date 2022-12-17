import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { Person } from "../../characters/typings";

const initialState = {
  character: null as null | Person,
  totalIncome: 0, // зарплата с учетом всех долгов
  wallet: 0, // текущие накопления
};

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    setCharacter: (state, action: PayloadAction<Person>) => {
      state.character = action.payload;
      state.totalIncome = action.payload.salary - action.payload.spendingsMonthPayment;
      state.wallet = action.payload.startMoney;
    },
    setWallet: (state, action: PayloadAction<number>) => {
      state.wallet = action.payload;
    },
    increaseWallet: (state, action: PayloadAction<number>) => {
      state.wallet += action.payload;
    },
    decreaseWallet: (state, action: PayloadAction<number>) => {
      state.wallet -= action.payload;
    },
    setTotalIncome: (state, action: PayloadAction<number>) => {
      state.totalIncome = action.payload;
    },
  },
});

export const { setCharacter, setTotalIncome, setWallet, increaseWallet, decreaseWallet } =
  characterSlice.actions;

// Selectors
export const selectCharacter = (state: RootState) => state.character.character;

export default characterSlice.reducer;
