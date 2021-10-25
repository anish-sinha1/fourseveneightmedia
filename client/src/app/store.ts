import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import userReducer from "../components/user/userSlice";
import profileReducer from "../components/profile/profileSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
