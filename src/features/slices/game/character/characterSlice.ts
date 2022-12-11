import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { Person } from "../../characters/typings";

const initialState = {
  character: null as null | Person,
};

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    setCharacter: (state, action: PayloadAction<Person>) => {
      state.character = action.payload;
    },
  },
});

export const { setCharacter } = characterSlice.actions;

// Selectors
export const selectCharacter = (state: RootState) => state.character.character;

export default characterSlice.reducer;
