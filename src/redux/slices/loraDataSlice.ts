import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import instances from 'src/utils/plugins/axios';

interface InitialStateType {
  listLoading: boolean;
  creating: boolean;
  deleteting: boolean;
  editing: boolean;
}

const initialState: InitialStateType = {
  listLoading: false,
  creating: false,
  deleteting: false,
  editing: false,
};

export const getSensor = createAsyncThunk('sensors/getSensor', async (sensorId: any, { rejectWithValue }) => {
  try {
    const res = await instances.get(`/sensor/${sensorId}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getSensors = createAsyncThunk('/node/sensors/getSensors', async (nodeId: any) => {
  const res = await instances.get(`/node/${nodeId}/sensors`);
  return res.data;
});

export const getSensorIntervalLatestData = createAsyncThunk('/node/sensors/getSensorIntervalLatestData', async (sensorId: any) => {
  const res = await instances.get(`/sensor/${sensorId}/data/interval/latest`);
  return res.data;
});

export const getSensorIntervalData = createAsyncThunk('/node/sensors/getSensorIntervalData', async (sensorId: any) => {
  const res = await instances.get(`/sensor/${sensorId}/data/interval`);
  return res.data;
});

export const createSensors = createAsyncThunk('sensors/createSensors', async ({ req, nodeId }: { req: any; nodeId: any },{ rejectWithValue }) => {
  try {
    const res = await instances.post(`/node/${nodeId}/sensor`, req);
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const editSensors = createAsyncThunk('sensors/editSensors', async (req: any, { rejectWithValue }) => {
  try {
    const res = await instances.put(`/sensor/${req.id}`, {
      ...req
    });
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const editSensorThreshold = createAsyncThunk('sensors/editSensorThreshold', async ({ req, sensorId }: { req: any; sensorId: any }, { rejectWithValue }) => {
  try {
    const res = await instances.put(`/sensor/${sensorId}/threshold`, {
      ...req
    });
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const deleteSensors = createAsyncThunk('sensors/deleteSensors', async (id: any, { rejectWithValue }) => {
  try {
    const res = await instances.delete(`/sensor/${id}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const sensorSlice = createSlice({
  name: 'sensors',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getSensors.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(getSensors.fulfilled, (state) => {
        state.listLoading = false;
      })
      .addCase(getSensors.rejected, (state, action: any) => {
        state.listLoading = false;
        toast.error(action.error.message);
      })
      .addCase(createSensors.pending, (state) => {
        state.creating = true;
      })
      .addCase(createSensors.fulfilled, (state) => {
        state.creating = false;
        toast.success('Create successfully!');
      })
      .addCase(createSensors.rejected, (state, action: any) => {
        state.creating = false;
        toast.error(action.payload.response.data.detail);
      })
      .addCase(deleteSensors.pending, (state) => {
        state.deleteting = true;
      })
      .addCase(deleteSensors.fulfilled, (state) => {
        state.deleteting = false;
        toast.success('Delete successfully!');
      })
      .addCase(deleteSensors.rejected, (state, action: any) => {
        state.deleteting = false;
        toast.error(action.payload.response.data.detail);
      })
      .addCase(editSensors.pending, (state) => {
        state.editing = true;
      })
      .addCase(editSensors.fulfilled, (state) => {
        state.editing = false;
        toast.success('Update successfully!');
      })
      .addCase(editSensors.rejected, (state, action: any) => {
        state.editing = false;
        toast.error(action.payload.response.data.detail);
      })
      .addCase(editSensorThreshold.pending, (state) => {
        state.editing = true;
      })
      .addCase(editSensorThreshold.fulfilled, (state) => {
        state.editing = false;
        toast.success('Update successfully!');
      })
      .addCase(editSensorThreshold.rejected, (state, action: any) => {
        state.editing = false;
        toast.error(action.payload.response.data.detail);
      });
  },
});
// export const { } = sensorSlice.actions;
export default sensorSlice.reducer;
