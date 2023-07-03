import { configureStore } from "@reduxjs/toolkit";
import { VacationReducer } from "./VacationsReducer";
import { UsersReducer } from "./usersReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "main-root",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, UsersReducer);

export const travel = configureStore({
  reducer: {
    vacations: VacationReducer,
    users: persistedUserReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }),
});

export const persister = persistStore(travel);
