import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export declare type AppThemeMode = "light" | "dark" | "system";

type ConfigState = {
  useBiometrics: boolean;
  firstTimeLogin: boolean;
  jaLeuCartilha: boolean;
  themeMode: AppThemeMode;
  consentimento: boolean;
};

// Define the initial state using that type
export const initialState: ConfigState = {
  useBiometrics: undefined,
  firstTimeLogin: true,
  jaLeuCartilha: false,
  themeMode: "system",
  consentimento: false,
};

export const configSlice = createSlice({
  name: "config",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUseBiometrics: (state, action: PayloadAction<boolean>) => {
      state.useBiometrics = action.payload;
    },
    setFirstTimeLogin: (state, action: PayloadAction<boolean>) => {
      state.firstTimeLogin = action.payload;
    },
    setJaLeuCartilha: (state, action: PayloadAction<boolean>) => {
      state.jaLeuCartilha = action.payload;
    },
    setThemeMode: (state, action: PayloadAction<AppThemeMode>) => {
      state.themeMode = action.payload;
    },
    setConsentimento: (state, action: PayloadAction<boolean>) => {
      state.consentimento = action.payload;
    },
  },
});

export const { setUseBiometrics, setFirstTimeLogin, setJaLeuCartilha, setThemeMode, setConsentimento } =
  configSlice.actions;

export const selectIsUsingBiometrics = (state: RootState) => state.config.useBiometrics;
export const selectIsFirstTimeLogin = (state: RootState) => state.config.firstTimeLogin;
export const selectConsentimento = (state: RootState) => state.config.consentimento;
export const selectJaLeuCartilha = (state: RootState) => state.config.jaLeuCartilha;
export const selectThemeMode = (state: RootState) => state.config.themeMode;
