import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import searchSlice from "./searchSlice";
import chosenQuerySlice from "./chosenQuerySlice";
import chatSlice from "./chatSlice";

const store=configureStore({
    reducer:{
        app:appSlice,
        search:searchSlice,
        chosenQuery:chosenQuerySlice,
        chat: chatSlice
    }
});

export default store