import { createSlice } from "@reduxjs/toolkit";

const categoryslice = createSlice({
  name: "category",
  initialState: { categoryName: "" },
  reducers: {
    updateCategory: (state, action) => {
      state.categoryName= action.payload;
    },cleanCategory:(state)=>{
        state.categoryName=""
    }
  },
});

export const { updateCategory,cleanCategory } = categoryslice.actions;
export default categoryslice.reducer;
