import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { defaultMaxCardsInARow } from "./models";
import { Person } from "./typings";
import { generateCharacters } from "./utils/generateCharacters";

const initialState = {
  characters: [] as Person[],
  current: 0,
  currentMaxInARow: defaultMaxCardsInARow.LAPTOP,
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
    setCurrentMaxInARow: {
      prepare: (screenWidth: number) => {
        let maxCardsInARow = defaultMaxCardsInARow.PHONE;

        if (screenWidth > 1440) {
          maxCardsInARow = defaultMaxCardsInARow.DESKTOP;
        } else if (screenWidth > 1024) {
          maxCardsInARow = defaultMaxCardsInARow.LAPTOP;
        } else if (screenWidth > 768) {
          maxCardsInARow = defaultMaxCardsInARow.TABLET;
        }
        return {
          payload: maxCardsInARow,
        };
      },
      reducer: (state, action: PayloadAction<number>) => {
        state.currentMaxInARow = action.payload;
      },
    },
  },
});

export const { setCharacters, setCurrentMaxInARow, increaseCurrent, decreaseCurrent } =
  characterSlice.actions;

// Selectors
const selectCharacters = (state: RootState) => state.characters.characters;

const selectCurrent = (state: RootState) => state.characters.current;

export const isCharactersCreated = createSelector(
  selectCharacters,
  (characters) => characters.length > 0
);

export const selectFilteredCharacters = createSelector(
  [
    selectCharacters,
    selectCurrent,
    (state: RootState) => state.characters.currentMaxInARow,
  ],
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

export default characterSlice.reducer;
