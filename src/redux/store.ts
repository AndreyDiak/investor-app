import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import {
  characterSlice,
  spendsSlice,
  settingsSlice,
  charactersSlice,
  stocksSlice,
  timeSlice,
} from "./slices";
// ...

export const store = configureStore({
  reducer: {
    spends: spendsSlice.reducer,
    settings: settingsSlice.reducer,
    characters: charactersSlice.reducer,
    character: characterSlice.reducer,
    time: timeSlice.reducer,
    stocks: stocksSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Thunks type
export type ThunkType = ThunkAction<void, RootState, unknown, AnyAction>;