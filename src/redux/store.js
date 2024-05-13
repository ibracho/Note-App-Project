import { configureStore } from "@reduxjs/toolkit";
import { notesReducer } from "./reducers/notesReducers";

const store = configureStore({
    reducer: notesReducer,
});

export default store;