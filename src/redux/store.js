import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projectReducer"; // ✅ Correct Import

export const store = configureStore({
  reducer: {
    project: projectReducer, // ✅ Reducer key must match useSelector
  },
});