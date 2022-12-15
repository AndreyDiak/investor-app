import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {  
  stocks: [],
  myStocks: []
};

export const bondsSlice = createSlice({
  name: "bonds",
  initialState,
  reducers: {
    
  },
});

export const { } = bondsSlice.actions;

// Selectors

export default bondsSlice.reducer;
