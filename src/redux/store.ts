import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { LogBox, Platform } from "react-native";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
// import reduxPersistExpoSecurestore from "redux-persist-expo-securestore";
import { mobileApi } from "../services/api";
import { authSlice } from "./authSlice";
import { configSlice } from "./configSlice";
LogBox.ignoreLogs(["larger than 2048 bytes"]); // Ignore log notification by message

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  // storage: Platform.OS !== "web" ? reduxPersistExpoSecurestore() : AsyncStorage,  
};

const rootReducer = combineReducers({
  [mobileApi.reducerPath]: mobileApi.reducer,
  [configSlice.name]: configSlice.reducer,
  [authSlice.name]: authSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(mobileApi.middleware);
  },
});

export const persistor = persistStore(store);

// store.subscribe(() => {
//   saveState(store.getState());
// });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
