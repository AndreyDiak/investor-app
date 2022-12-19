import { AnyAction, createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { Person } from "../../characters/typings";

const initialState = {
  character: null as null | Person,
  totalIncome: 0, // зарплата с учетом всех долгов
  walletBalance: 0, // текущие накопления
};

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    setCharacter: (state, action: PayloadAction<Person>) => {
      state.character = action.payload;
      state.totalIncome = action.payload.salary - action.payload.spendingsMonthPayment;
      state.walletBalance = action.payload.startMoney;
    },
    setWallet: (state, action: PayloadAction<number>) => {
      state.walletBalance = action.payload;
    },
    increaseWallet: (state, action: PayloadAction<number>) => {
      state.walletBalance += action.payload;
    },
    decreaseWallet: (state, action: PayloadAction<number>) => {
      state.walletBalance -= action.payload;
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

export const selectWalletBalance = (state: RootState) => state.character.walletBalance;

export const selectTotalIncome = (state: RootState) => state.character.totalIncome;

type ThunkType = ThunkAction<void, RootState, unknown, AnyAction>;

export const monthPayment = (): ThunkType => (dispatch, getState) => {
  const income = getState().character.totalIncome;
  dispatch(increaseWallet(income));
};

export default characterSlice.reducer;
