/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import instances from 'src/utils/plugins/axios';
import { UsersProps, UserDetailById } from 'src/utils/interface';

interface InitialStateType {
  userDetailById: UserDetailById | undefined;
  users: any[];
  userDetail: UsersProps | undefined;
  loading: boolean;
  updating: boolean;
  getUserLoading: boolean;
  updatingPassword: boolean;
  searching: boolean;
  error: string;
}

const initialState: InitialStateType = {
  users: [],
  userDetailById: undefined,
  userDetail: undefined,
  loading: false,
  updating: false,
  getUserLoading: false,
  updatingPassword: false,
  searching: false,
  error: '',
};

export const getUsers = createAsyncThunk('users/getUsers', async (req?: any) => {
  const res = await instances.get('/users', { params: { search: req } });
  const list = res.data.data.map((u: UsersProps) => {
    return {
      name: u.firstName + ' ' + u.lastName,
      email: u.email,
      phone: u.phone,
      role: u.role,
      isDeleted: u.isDeleted,
      id: u.id,
      avatar: u.avatar,
    };
  });
  return list;
});

export const searchUsers = createAsyncThunk('users/searchUsers', async (req: any, { rejectWithValue }) => {
  try {
    const res = await instances.get('/users/customer', { params: { search: req } });
    const list = res.data.data.map((u: UsersProps) => {
      return {
        name: u.firstName + ' ' + u.lastName,
        email: u.email,
        phone: u.phone,
        role: u.role,
        isDeleted: u.isDeleted,
        id: u.id,
        avatar: u.avatar,
      };
    });
    return list;
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const getUserDetail = createAsyncThunk('users/getUserDetail', async (id: any, { rejectWithValue }) => {
  try {
    const res = await instances.get(`/user/${id}`);
    return res.data;
  } catch (e) {
    return rejectWithValue(e);
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
    return rejectWithValue(e);
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
    return rejectWithValue(e);
  }
});

export const activateUser = createAsyncThunk('users/activateUser', async (req: any, { rejectWithValue }) => {
  try {
    const res = await instances.put(`/user/${req.id}/activation`, {
      isDeleted: req.isDeleted,
    });
    return res.data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const getUserById = createAsyncThunk('users/getUserById', async (id: any) => {
  const res = await instances.get(`/user/${id}`);
  const formated: UserDetailById = {
    // name: res.data.firstName + ' ' + res.data.lastName,
    firstName: res.data.firstName,
    lastName: res.data.lastName,
    email: res.data.email,
    phone: res.data.phone,
    role: res.data.role,
    isDeleted: res.data.isDeleted,
    id: res.data.id,
    avatar: res.data.avatar,
    address: res.data.address,
    dateOfBirth: res.data.dateOfBirth,
  };
  return formated;
});

export const changeUserAvatar = createAsyncThunk('users/changeUserAvatar', async (req: any) => {
  const res = await instances.put(`/user/${req.id}/avatar`, {
    avatar: req.avatar,
  });
  return res.data;
});

export const updatePassword = createAsyncThunk('users/updatePassword', async (req: any, { rejectWithValue }) => {
  try {
    const res = await instances.post(`/user/updatePassword`, {
      email: req.email,
      oldPassword: req.oldPassword,
      newPassword: req.newPassword,
    });
    return res.data;
  } catch (e) {
    return rejectWithValue(e);
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
      })
      .addCase(activateUser.fulfilled, () => {
        toast.success('Update succussfully! 👌');
      })
      .addCase(activateUser.rejected, (action: any) => {
        toast.error(action.payload.response.data.detail);
      })
      .addCase(getUserById.pending, (state) => {
        state.getUserLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action: PayloadAction<any>) => {
        state.getUserLoading = false;
        state.userDetailById = action.payload;
      })
      .addCase(getUserById.rejected, (state, action: any) => {
        state.getUserLoading = false;
        state.error = action.error;
      })
      .addCase(changeUserAvatar.fulfilled, () => {
        toast.success('Update succussfully! 👌');
      })
      .addCase(changeUserAvatar.rejected, (state, action: any) => {
        state.error = action.error;
      })
      .addCase(updatePassword.pending, (state) => {
        state.updatingPassword = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.updatingPassword = false;
        toast.success('Update succussfully! 👌');
      })
      .addCase(updatePassword.rejected, (state, action: any) => {
        state.updatingPassword = false;
        state.error = action.payload.response.data.detail;
        toast.error(action.payload.response.data.detail);
      })
      .addCase(searchUsers.pending, (state) => {
        state.searching = true;
      })
      .addCase(searchUsers.fulfilled, (state) => {
        state.searching = false;
      })
      .addCase(searchUsers.rejected, (state, action: any) => {
        state.searching = false;
        toast.error(action.payload.response.data.detail);
      });
  },
});
export const { setUserDetail } = usersSlice.actions;
export default usersSlice.reducer;
