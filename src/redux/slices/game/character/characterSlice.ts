import { AnyAction, createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { Person } from "../../characters/typings";

const mock = {
   name: "Изабель",
   age: 19,
   work: "Танцовщица",
   photo: {
      img: "/src/assets/characters/person-9.png",
      avatar: "/src/assets/characters/person-9-avatar.png",
   },
   salary: 976,
   startMoney: 1628,
   difficulty: "easy",
   spendings: [
      {
         type: "home",
         title: "Дом",
         startPrice: 2130,
         remainPrice: 2130,
         paymentPercantage: 8,
      },
      {
         type: "car",
         title: "Машина",
         startPrice: 1640,
         remainPrice: 1640,
         paymentPercantage: 2,
      },
      {
         type: "credit-card",
         title: "Кредитные карты",
         startPrice: 580,
         remainPrice: 580,
         paymentPercantage: 8,
      },
   ],
   spendingsMonthPayment: 248,
};

const initialState = {
   character: mock as null | Person,
   initialIncome: 0, // зарплата игрока
   totalCredit: 0, // суммарный кредит игрока
   passiveIncome: 0, // пассивный доход
   walletBalance: 0, // текущие накопления
};

export const characterSlice = createSlice({
   name: "character",
   initialState,
   reducers: {
      setCharacter: (state, action: PayloadAction<Person>) => {
         state.character = action.payload;
         state.initialIncome = action.payload.salary;
         state.totalCredit = action.payload.spendingsMonthPayment;
         state.passiveIncome = 0;
         state.walletBalance = action.payload.startMoney;
      },
      setWallet: (state, action: PayloadAction<number>) => {
         state.walletBalance = action.payload;
      },
      increaseWallet: (state, action: PayloadAction<number>) => {
         state.walletBalance = Number((state.walletBalance + action.payload).toFixed(1));
      },
      decreaseWallet: (state, action: PayloadAction<number>) => {
         state.walletBalance = Number((state.walletBalance - action.payload).toFixed(1));
      },
   },
});

export const { setCharacter, setWallet, increaseWallet, decreaseWallet } =
   characterSlice.actions;

// Selectors
export const selectCharacter = (state: RootState) => state.character.character;

export const selectWalletBalance = (state: RootState) => state.character.walletBalance;

export const selectInitialIncome = (state: RootState) => state.character.initialIncome;

type ThunkType = ThunkAction<void, RootState, unknown, AnyAction>;

export const monthPayment = (): ThunkType => (dispatch, getState) => {
   const income = getState().character.initialIncome;
   dispatch(increaseWallet(income));
};

export default characterSlice.reducer;
