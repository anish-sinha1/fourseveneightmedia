import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import Api from "../../app/Api";

export interface PostObject {}

export interface PostInitialState {
  post: PostObject | null;
  posts: PostObject[] | null;
  status: "idle" | "pending" | "failed";
}

const initialState: PostInitialState = {
  post: null,
  posts: null,
  status: "idle",
};

export interface PostObject {
  title: string;
  content: string;
  summary: string;
  category: string;
  tags: string[];
  imageUri: string;
  imageAlt: string;
}

export interface PostArgs {
  idToken: string;
  accessToken: string;
  contentType: "application/json" | "multipart/form-data";
  post: PostObject;
}

export const loadPosts = createAsyncThunk("post/loadposts", async () => {
  try {
    const api = new Api().instance;
    const res = await api.get("/post");
    console.log(res);
  } catch (err) {
    console.log(err);
  }
});

export const loadPost = createAsyncThunk("post/loadpost", async () => {
  try {
  } catch (err) {}
});

export const createPost = createAsyncThunk(
  "post/create",
  async (args: PostArgs, { dispatch }) => {
    try {
      const api = new Api(args.accessToken, args.contentType).instance;
      await api.post("/post", args);
    } catch (err) {
      console.log(err);
    }
  }
);

export const editPost = createAsyncThunk("post/editpost", async () => {
  try {
  } catch (err) {}
});

export const removePost = createAsyncThunk("post/removepost", async () => {
  try {
  } catch (err) {}
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
});

export default postSlice.reducer;
