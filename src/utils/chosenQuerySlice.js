import { createSlice } from "@reduxjs/toolkit";

const chosenQuerySlice= createSlice({
    name:"chosenQuery",
    initialState:[],
    reducers:{
        chosenQueryResults:(state, action)=>{
            state=state.push(action.payload)
          }
    }
})
export const {chosenQueryResults}=chosenQuerySlice.actions
export default chosenQuerySlice.reducer