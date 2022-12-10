import { characterSlice } from "./slices/characters/characterSlice";
import { settingsSlice } from "./slices/settings/settingsSlice";
import { spendsSlice } from "./slices/spends/spendsSlice";

import { configureStore } from "@reduxjs/toolkit";
// ...

export const store = configureStore({
  reducer: {
    spends: spendsSlice.reducer,
    settings: settingsSlice.reducer,
    characters: characterSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
