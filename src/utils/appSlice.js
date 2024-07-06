import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    sidebar: false,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar = !state.sidebar;
    },
    closeSidebar: (state) => {
      state.sidebar = false;
    },
    openSidebar: (state) => {
      state.sidebar = true;
    },
  },
});

export const { toggleSidebar, closeSidebar, openSidebar } = appSlice.actions;

export default appSlice.reducer;
