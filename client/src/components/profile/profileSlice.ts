import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import Api from "../../app/Api";
import { UserObject } from "../user/userSlice";

export interface ProfileObject {
  username: string;
  bio: string;
  spaces: string[];
  user_id: string;
  followers: string[];
  following: string[];
  picture: string;
}

export interface ProfileInitialState {
  profile: ProfileObject | null;
  status: "idle" | "pending" | "failed";
}

const initialState: ProfileInitialState = {
  profile: null,
  status: "idle",
};

export interface CreateProfileArgs {
  user: UserObject;
  accessToken: string;
}

export const loadProfile = createAsyncThunk(
  "profile/loadprofile",
  async (args: { username: string }) => {
    try {
      console.log("here");
      const { username } = args;
      const api = new Api().instance;
      const res = await api.get(`/profile/${username}`);
      console.log({ res });
    } catch (err) {
      console.log(err);
    }
  }
);

export const createProfileIfNotExists = createAsyncThunk(
  "profile/createprofile",
  async (args: CreateProfileArgs) => {
    try {
      const accessToken = `Bearer ${args.accessToken}`;
      const api = new Api(accessToken).instance;
      await api.post("/profile", args.user);
    } catch (err) {
      console.log(err);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadProfile.pending, (state) => {
      state.status = "pending";
    });
  },
});

export default profileSlice.reducer;
