import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import type {
  IConfig,
  TTheme,
} from './type';

const initialState: IConfig = {
  theme: "light"
};
export const ConfigsReducer = createSlice({
  name: "pageConfig2",
  initialState,
  reducers: {
    setTheme: (state: IConfig, action: PayloadAction<{ theme: TTheme }>) => {
      const { theme } = action.payload;
      state.theme = theme;
    },
    resetConfig: () => initialState,
  },
});

export const {

  resetConfig,
  setTheme
} = ConfigsReducer.actions;
export default ConfigsReducer.reducer;
