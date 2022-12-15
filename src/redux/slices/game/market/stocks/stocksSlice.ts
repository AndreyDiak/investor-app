import { Stock } from './typings';
import { generateStocks } from './utils/generateStocks';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DifficultyType } from "../../../settings/typings";

const initialState = {  
  stocks: [] as Stock[],
  myStocks: []
};

export const stocksSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    setInitialStocks: {
      prepare: (difficulty: DifficultyType) => {
        const stocks = generateStocks(difficulty)
        return {
          payload: stocks
        }
      },
      reducer: (state, action: PayloadAction<Stock[]>) => {
        state.stocks = action.payload
      }
    }
  },
});

export const { setInitialStocks } = stocksSlice.actions;

// Selectors

export default stocksSlice.reducer;
