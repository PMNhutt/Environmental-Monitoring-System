import { createSlice } from '@reduxjs/toolkit';

interface InitialStateType {
  openDropDown: boolean;
  mobileOpen: boolean;
}

const initialState: InitialStateType = {
  openDropDown: false,
  mobileOpen: false,
};

export const contextSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setOpenDropDown: (state) => {
      state.openDropDown = !state.openDropDown;
    },
    setMobileOpen: (state, action) => {
      state.mobileOpen = action.payload;
    },
  },
});
export const { setOpenDropDown, setMobileOpen } = contextSlice.actions;
export default contextSlice.reducer;
