import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import {
   characterSlice,
   charactersSlice,
   newsSlice,
   modalSlice,
   settingsSlice,
   spendsSlice,
   stocksSlice,
   bondsSlice,
   timeSlice,
   portfolioSlice,
} from "./slices";
// ...

export const store = configureStore({
   reducer: {
      // game pages
      spends: spendsSlice.reducer,
      news: newsSlice.reducer,
      character: characterSlice.reducer,

      // market
      bonds: bondsSlice.reducer,
      stocks: stocksSlice.reducer,
      portfolio: portfolioSlice.reducer,

      // game helpers
      modal: modalSlice.reducer,
      time: timeSlice.reducer,

      // game start
      settings: settingsSlice.reducer,
      characters: charactersSlice.reducer,
   },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Thunks type
export type ThunkType = ThunkAction<void, RootState, unknown, AnyAction>;
