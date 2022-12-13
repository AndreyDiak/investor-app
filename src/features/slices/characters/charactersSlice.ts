import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { selectMaxCardsInARow } from "../settings/settingsSlice";
import { Person } from "./typings";
import { generateCharacters } from "./utils/generateCharacters";

const initialState = {
  characters: [] as Person[],
  current: 0,
};

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setCharacters: (state) => {
      state.characters =
        state.characters.length === 0 ? generateCharacters() : state.characters;
    },
    increaseCurrent: (state) => {
      if (state.current === state.characters.length) {
        state.current = 0;
      } else {
        state.current = state.current + 1;
      }
    },
    decreaseCurrent: (state) => {
      if (state.current === 0) {
        state.current = state.characters.length;
      } else {
        state.current = state.current - 1;
      }
    },
  },
});

export const { setCharacters, increaseCurrent, decreaseCurrent } =
  charactersSlice.actions;

// Selectors
const selectCharacters = (state: RootState) => state.characters.characters;

const selectCurrent = (state: RootState) => state.characters.current;

export const isCharactersCreated = createSelector(
  selectCharacters,
  (characters) => characters.length > 0
);

export const selectFilteredCharacters = createSelector(
  [selectCharacters, selectCurrent, selectMaxCardsInARow],
  (characters, current, currentMaxInRow) => {
    if (current + currentMaxInRow <= characters.length) {
      return characters.slice(current, current + currentMaxInRow);
    } else {
      return [
        ...characters.slice(current, characters.length),
        ...characters.slice(0, current + currentMaxInRow - characters.length),
      ];
    }
  }
);

export default charactersSlice.reducer;
