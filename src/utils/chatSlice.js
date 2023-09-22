import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [{ name: "Hello", messagge: "Hello World" }],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;
