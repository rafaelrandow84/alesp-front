import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TokenResponse } from "expo-auth-session";
import { RootState } from "@/redux/store";

type UserData = Record<string, any>;

export type StateTokenResponse = Omit<TokenResponse, "getRequestConfig" | "refreshAsync" | "shouldRefresh">;

type AuthState = {
  tokenResponse?: StateTokenResponse;
  userData?: UserData;
};

// Define the initial state using that type
const initialState: AuthState = {
  tokenResponse: undefined,
  userData: undefined,
};
export const authSlice = createSlice({
  name: "auth",

  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
    setTokenResponse: (state, action: PayloadAction<StateTokenResponse>) => {
      state.tokenResponse = action.payload;
    },
  },
});

export const { setTokenResponse, setUserData } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTokenResponse = (state: RootState) => state.auth.tokenResponse;
export const selectUserData = (state: RootState) => state.auth.userData;
