import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import instances from 'src/utils/plugins/axios';

interface InitialStateType {
  listLoading: boolean;
  creating: boolean;
}

const initialState: InitialStateType = {
  listLoading: false,
  creating: false,
};

export const getNodes = createAsyncThunk('nodes/getNodes', async () => {
  const res = await instances.get('/nodes');
  return res.data;
});

export const createNodes = createAsyncThunk('nodes/createNodes', async (req: any, { rejectWithValue }) => {
  try {
    const res = await instances.post('/node', req);
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const nodeSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getNodes.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(getNodes.fulfilled, (state) => {
        state.listLoading = false;
      })
      .addCase(getNodes.rejected, (state, action: any) => {
        state.listLoading = false;
        toast.error(action.error.message);
      })
      .addCase(createNodes.pending, (state) => {
        state.creating = true;
      })
      .addCase(createNodes.fulfilled, (state) => {
        state.creating = false;
        toast.success('Create successfully!');
      })
      .addCase(createNodes.rejected, (state, action: any) => {
        state.creating = false;
        toast.error(action.error.message);
      });
  },
});
// export const { } = nodeSlice.actions;
export default nodeSlice.reducer;
