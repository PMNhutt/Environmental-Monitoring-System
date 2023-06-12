/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import instances from 'src/utils/plugins/axios';
import { UsersProps } from 'src/utils/interface';

const initialState = {
  users: [],
  userDetail: undefined,
  loading: false,
  error: '',
};

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const res = await instances.get('/users');
  const list = res.data.data.map((u: UsersProps) => {
    return {
      name: u.firstName + ' ' + u.lastName,
      email: u.email,
      phone: u.phone,
      role: u.role,
      isDeleted: u.isDeleted,
      id: u.id,
    };
  });
  return list;
});

export const getUserDetail = createAsyncThunk('users/getUserDetail', async (id: any, { rejectWithValue }) => {
  try {
    const res = await instances.get(`/user/${id}`);
    return res.data;
  } catch (e) {
    rejectWithValue(e);
  }
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserDetail: (state, action) => {
      state.userDetail = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getUserDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetail.fulfilled, (state, action: PayloadAction<any>) => {
        state.userDetail = action.payload;
        state.loading = false;
      })
      .addCase(getUserDetail.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
export const { setUserDetail } = usersSlice.actions;
export default usersSlice.reducer;
