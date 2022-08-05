import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "../reducers/noteReducer/notesReducer";
import alertReducer from "../reducers/noteReducer/alertReducer";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    alert: alertReducer,
  },
  // to avoid serialization errors/warning here we have disable defualt middleware from redux toolkit
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
