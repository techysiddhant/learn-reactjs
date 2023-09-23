import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//create action
export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://64853adfa795d24810b6c7cb.mockapi.io/crud",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json" },
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// read action
export const showUser = createAsyncThunk(
  "showUser",
  async (args, { rejectWithValue }) => {
    const response = await fetch(
      "https://64853adfa795d24810b6c7cb.mockapi.io/crud"
    );
    try {
      const result = await response.json();
      // console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//delete action
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `https://64853adfa795d24810b6c7cb.mockapi.io/crud/${id}`,
      { method: "DELETE" }
    );
    try {
      const result = await response.json();
      // console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//update action
export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      `https://64853adfa795d24810b6c7cb.mockapi.io/crud/${data.id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json" },
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData: [],
  },
  reducers: {
    searchUser: (state, action) => {
      console.log(action.payload);
      state.searchData = action.payload;
    },
  },
  extraReducers: {
    [createUser.pending]: (state) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.users.push(action.payload);
      state.loading = false;
    },
    [createUser.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    [showUser.pending]: (state) => {
      state.loading = true;
    },
    [showUser.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    [showUser.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      // state.users = action.payload;
      const { id } = action.payload;
      if (id) {
        state.users = state.users.filter((user) => user.id !== id);
      }
      state.loading = false;
    },
    [deleteUser.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.users = state.users.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      );

      state.loading = false;
    },
    [updateUser.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default userDetail.reducer;
export const { searchUser } = userDetail.actions;
