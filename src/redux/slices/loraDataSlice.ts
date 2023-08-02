import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import instances from 'src/utils/plugins/axios';

interface InitialStateType {
  listLoading: boolean;
  creating: boolean;
  creatingLocation: boolean;
  deleteting: boolean;
  deletetingLocation: boolean;
  editing: boolean;
  editingLocation: boolean;
  loading: boolean;
}

const initialState: InitialStateType = {
  listLoading: false,
  creating: false,
  creatingLocation: false,
  deleteting: false,
  deletetingLocation: false,
  editing: false,
  editingLocation: false,
  loading: false,
};

export const getSensor = createAsyncThunk('sensors/getSensor', async (sensorId: any, { rejectWithValue }) => {
  try {
    const res = await instances.get(`/sensor/${sensorId}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getLocation = createAsyncThunk('location/getLocation', async (locationId: any, { rejectWithValue }) => {
  try {
    const res = await instances.get(`/location/${locationId}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getSensors = createAsyncThunk('/node/sensors/getSensors', async (nodeId: any) => {
  const res = await instances.get(`/node/${nodeId}/sensors`);
  return res.data;
});

export const getNodePermission = createAsyncThunk('/node/getNodePermission', async (nodeId: any) => {
  const res = await instances.get(`/node/${nodeId}/permissions`);
  return res.data;
});

export const getNodeAlertList = createAsyncThunk('/node/sensors/getNodeAlertList', async (params: any) => {
  const res = await instances.get(`/node/${params.nodeId}/alerts`, {
    params: {
      offset: params.offset,
      limit: params.limit,
    },
  });
  return res.data;
});

export const getAllSensors = createAsyncThunk('/sensors/getSensors', async (params: any) => {
  const res = await instances.get(`/sensors`, {
    params: {
      offset: params.offset,
      limit: params.limit,
      search: params.search,
    },
  });
  return res.data;
});

export const getAllLocations = createAsyncThunk('/sensors/getLocations', async (params: any) => {
  const res = await instances.get(`/locations`, {
    params: {
      offset: params.offset,
      limit: params.limit,
      search: params.search,
      sort: params.sort
    },
  });
  return res.data;
});

export const getAllLocationsVer2 = createAsyncThunk('/sensors/getLocations', async (params: any) => {
  const res = await instances.get(`/v2/locations`, {
    params: {
      search: params.search,
    },
  });
  return res.data;
});

export const getSensorIntervalLatestData = createAsyncThunk(
  '/node/sensors/getSensorIntervalLatestData',
  async (sensorId: any) => {
    const res = await instances.get(`/sensor/${sensorId}/data/interval/latest`);
    return res.data;
  },
);

export const getSensorIntervalData = createAsyncThunk('/node/sensors/getSensorIntervalData', async ({sensorId, params} : {sensorId: any, params: any}) => {
  const res = await instances.get(`/v2/sensor/${sensorId}/data/interval`, {
    params: {
      ...params
    }
  });
  return res.data;
});

export const getSensorEventData = createAsyncThunk('/node/sensors/getSensorIntervalData', async (sensorId: any) => {
  const res = await instances.get(`/v2/sensor/${sensorId}/data/event`);
  return res.data;
});

export const getSensorOfTypeIntervalData = createAsyncThunk(
  '/node/sensors/getSensorOfTypeIntervalData',
  async ({ type, req }: { type: string; req: any }) => {
    const res = await instances.get(`/sensor/type/${type}/data/interval`, {
      params: {
        startDate: req.startDate,
        endDate: req.endDate,
      },
    });
    return res.data;
  },
);

export const getSensorOfTypeIntervalDataVer2 = createAsyncThunk(
  '/node/sensors/getSensorOfTypeIntervalDataVer2',
  async ({ type, params }: { type: string; params: any }) => {
    const res = await instances.get(`/v2/sensor/type/${type}/data/interval`, {
      params: {
        ...params
      }
    });
    return res.data;
  },
);

export const createSensors = createAsyncThunk(
  'sensors/createSensors',
  async ({ req, nodeId }: { req: any; nodeId: any }, { rejectWithValue }) => {
    try {
      const res = await instances.post(`/node/${nodeId}/sensor`, req);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createLocation = createAsyncThunk(
  'locations/createLocation',
  async (req: any, { rejectWithValue }) => {
    try {
      const res = await instances.post(`/location`, req);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const editSensors = createAsyncThunk('sensors/editSensors', async (req: any, { rejectWithValue }) => {
  try {
    const res = await instances.put(`/sensor/${req.id}`, {
      ...req,
    });
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const editLocation = createAsyncThunk('sensors/editLocations', async (req: any, { rejectWithValue }) => {
  try {
    const res = await instances.put(`/location/${req.id}`, {
      ...req,
    });
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const editSensorActive = createAsyncThunk('sensors/editSensorActive', async (id: string, { rejectWithValue }) => {
  try {
    const res = await instances.put(`/sensor/${id}/isActive`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const editSensorThreshold = createAsyncThunk(
  'sensors/editSensorThreshold',
  async ({ req, sensorId }: { req: any; sensorId: any }, { rejectWithValue }) => {
    try {
      const res = await instances.put(`/sensor/${sensorId}/threshold`, {
        ...req,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteSensors = createAsyncThunk('sensors/deleteSensors', async (id: any, { rejectWithValue }) => {
  try {
    const res = await instances.delete(`/sensor/${id}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const deleteLocation = createAsyncThunk('location/deleteLocation', async (id: any, { rejectWithValue }) => {
  try {
    const res = await instances.delete(`/location/${id}`);
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
      .addCase(createLocation.pending, (state) => {
        state.creatingLocation = true;
      })
      .addCase(createLocation.fulfilled, (state) => {
        state.creatingLocation = false;
        toast.success('Create successfully!');
      })
      .addCase(createLocation.rejected, (state, action: any) => {
        state.creatingLocation = false;
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
      .addCase(deleteLocation.pending, (state) => {
        state.deletetingLocation = true;
      })
      .addCase(deleteLocation.fulfilled, (state) => {
        state.deletetingLocation = false;
        toast.success('Delete successfully!');
      })
      .addCase(deleteLocation.rejected, (state, action: any) => {
        state.deletetingLocation = false;
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
      .addCase(editLocation.pending, (state) => {
        state.editingLocation = true;
      })
      .addCase(editLocation.fulfilled, (state) => {
        state.editingLocation = false;
        toast.success('Update successfully!');
      })
      .addCase(editLocation.rejected, (state, action: any) => {
        state.editingLocation = false;
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
