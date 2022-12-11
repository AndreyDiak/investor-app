// import { charactersSlice } from "./slices/characters/charactersSlice";
// import { settingsSlice } from "./slices/settings/settingsSlice";
// import { spendsSlice } from "./slices/spends/spendsSlice";

import { configureStore } from "@reduxjs/toolkit";
import { characterSlice, spendsSlice, settingsSlice, charactersSlice } from "./slices";
// ...

export const store = configureStore({
  reducer: {
    spends: spendsSlice.reducer,
    settings: settingsSlice.reducer,
    characters: charactersSlice.reducer,
    character: characterSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
