/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import instances from 'src/utils/plugins/axios';
import { UsersProps } from 'src/utils/interface';

const initialState = {
  users: [],
  userDetail: undefined,
  loading: false,
  updating: false,
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

export const createUser = createAsyncThunk('users/createUser', async (req: any, { rejectWithValue }) => {
  try {
    const res = await instances.post(`/user`, {
      firstName: req.firstName,
      lastName: req.lastName,
      phone: req.phone,
      email: req.email,
      address: req.address,
      dateOfBirth: req.dateOfBirth,
      password: req.password,
    });
    return res.data;
  } catch (e) {
    rejectWithValue(e);
  }
});

export const editUser = createAsyncThunk('users/editUser', async (req: any, { rejectWithValue }) => {
  try {
    const res = await instances.put(`/user/${req.id}`, {
      firstName: req.firstName,
      lastName: req.lastName,
      phone: req.phone,
      address: req.address,
      dateOfBirth: req.dateOfBirth,
    });
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
      })
      .addCase(createUser.pending, (state) => {
        state.updating = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.updating = false;
        toast.success('Create succussfully! 👌');
      })
      .addCase(createUser.rejected, (state, action: any) => {
        state.updating = false;
        state.error = action.payload.response.data.detail;
        toast.error(action.payload.response.data.detail);
      })
      .addCase(editUser.pending, (state) => {
        state.updating = true;
      })
      .addCase(editUser.fulfilled, (state) => {
        state.updating = false;
        toast.success('Update succussfully! 👌');
      })
      .addCase(editUser.rejected, (state, action: any) => {
        state.updating = false;
        state.error = action.payload.response.data.detail;
        toast.error(action.payload.response.data.detail);
      });
  },
});
export const { setUserDetail } = usersSlice.actions;
export default usersSlice.reducer;
