import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
    auth: authReducer,
});
const persistConfig = {
    key: "root",
    storage,
};

const persistReducers = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistReducers,
    middleware: [thunk],
});

export default store;
