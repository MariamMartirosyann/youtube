import { createSlice } from "@reduxjs/toolkit";

const chosenQuerySlice = createSlice({
  name: "chosenQuery",
  initialState: [],
  reducers: {
    chosenQueryResults: (state, action) => {
      state = state.push(action.payload);
    },
    resetChosenQueryResults: (state) => {
      state = [];
    },
  },
});
export const { chosenQueryResults,resetChosenQueryResults } = chosenQuerySlice.actions;
export default chosenQuerySlice.reducer;
