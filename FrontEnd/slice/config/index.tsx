import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import type {
  IConfig,
  TLang,
  TTheme,
} from './type';

const initialState: IConfig = {
  theme: 'default',
  locale: "fa",
};
export const ConfigsReducer = createSlice({
  name: "pageConfig",
  initialState,
  reducers: {
    setTheme: (state: IConfig, action: PayloadAction<{ theme: TTheme }>) => {
      const { theme } = action.payload;
      state.theme = theme;
    },
    setLocale: (state: IConfig, action: PayloadAction<{ locale: TLang }>) => {
      const { locale } = action.payload;
      state.locale = locale;
    },
    resetConfig: () => initialState,
  },
});

export const { resetConfig, setTheme, setLocale } = ConfigsReducer.actions;
export default ConfigsReducer.reducer;
