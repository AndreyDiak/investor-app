import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { defaultMaxCardsInRow } from './models';
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
const selectCharacters = (state: RootState) => state.characters.characters;

export const isCharactersCreated = createSelector(
  selectCharacters,
  (characters) => characters.length > 0
)

export const selectFilteredCharacters = createSelector(
  selectCharacters,
  (characters) => characters
)

export default characterSlice.reducer;
