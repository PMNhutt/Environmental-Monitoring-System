import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openDropDown: false,
};

export const contextSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setOpenDropDown: (state) => {
      state.openDropDown = !state.openDropDown;
    },
  },
});
export const { setOpenDropDown } = contextSlice.actions;
export default contextSlice.reducer;
