import { createSlice } from "@reduxjs/toolkit";

export interface PreferencesInitialState {
  darkMode: boolean;
  gistResolution:
    | "monokai"
    | "chaos"
    | "cobalt"
    | "idle-fingers"
    | "obsidian"
    | "one-dark"
    | "pastel-on-dark"
    | "solarized-dark"
    | "solarized-light"
    | "terminal"
    | "tomorrow-night"
    | "twilight"
    | "none";
}

const initialState: PreferencesInitialState = {
  darkMode: Boolean(localStorage.getItem("darkMode")),
  gistResolution: "none",
};

const preferencesSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDarkMode(state) {
      state.darkMode = !state.darkMode;
      state.darkMode || localStorage.removeItem("darkMode");
    },
  },
});

export const { setDarkMode } = preferencesSlice.actions;

export default preferencesSlice.reducer;
