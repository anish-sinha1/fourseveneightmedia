import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserObject {
  picture: string;
  email: string;
  email_verified: boolean;
  user_id: string;
  username: string;
}

export interface UserInitialState {
  user: UserObject | null;
}

const initialState: UserInitialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: {
      reducer: (state, action: PayloadAction<UserObject | null>) => {
        state.user = action.payload;
      },
      prepare: (user: UserObject | null) => ({ payload: user }),
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
