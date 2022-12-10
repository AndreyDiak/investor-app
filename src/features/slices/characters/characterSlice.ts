import { AnyAction, createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Person } from "./typings";
import { generateCharacters } from "./utils/generateCharacters";

const initialState = {
  characters: [] as Person[],
};

// export type SettingsState = typeof initialState;

export const characterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setCharacters: (state) => {
      state.characters =
        state.characters.length === 0 ? generateCharacters() : state.characters;
    },
  },
});

export const { setCharacters } = characterSlice.actions;
// Selectors
export const selectCharacters = (state: RootState) => state.characters.characters;

export default characterSlice.reducer;
