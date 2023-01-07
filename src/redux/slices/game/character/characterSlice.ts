import { round } from "./../../../../utils";
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
};

const initialState = {
   character: mock as null | Person,
   initialIncome: 0, // зарплата игрока
   passiveIncome: {}, // пассивный доход
   walletBalance: 0, // текущие накопления
};

export const characterSlice = createSlice({
   name: "character",
   initialState,
   reducers: {
      setCharacter: (state, action: PayloadAction<Person>) => {
         state.character = action.payload;
         state.initialIncome = action.payload.salary;
         state.passiveIncome = 0;
         state.walletBalance = action.payload.startMoney;
      },
      setWallet: (state, action: PayloadAction<number>) => {
         state.walletBalance = action.payload;
      },
      increaseWallet: (state, action: PayloadAction<number>) => {
         state.walletBalance = round(state.walletBalance + action.payload);
      },
      decreaseWallet: (state, action: PayloadAction<number>) => {
         state.walletBalance = round(state.walletBalance - action.payload);
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
   const income = getState().character.initialIncome; // доход с работы
   const creditTotal = getState().credit.total; // кредиты

   const stocksDividends = getState()
      .portfolio.portfolio.filter((p) => !!p.isDividends)
      .reduce((acc, item) => {
         const s = getState().stocks.stocks.find((stock) => stock.id === item.id)!;
         return (
            acc +
            round(
               (item.count * s.price[s.price.length - 1] * s.dividendsPercentage) / 100
            )
         );
      }, 0);

   const payment = income - creditTotal + stocksDividends;

   dispatch(increaseWallet(payment));
};

export default characterSlice.reducer;
