import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch data from the API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';
  try {
    const response = await fetch('https://parampara-admin.vercel.app/api/user/all-user', {
      method: 'GET',
      headers: {
        'Authorization':`Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data.status !== 1) {
      return rejectWithValue(data.message || 'Failed to fetch users');
    }

    return data.data; // Return user list if successful
  } catch (error) {
    return rejectWithValue(error.message || 'Something went wrong');
  }
});

// Async thunk to create a new user
export const createUser = createAsyncThunk('users/createUser', async (userData, { rejectWithValue }) => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';
  try {
    const response = await fetch('https://parampara-admin.vercel.app/api/user/create-user', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
   
    if(data.status==1){
      return data

    }

    if (data.status !== 1) {
      return rejectWithValue(data.message || 'Failed to create user');
    }

    // Return created user data if successful
  } catch (error) {
    return rejectWithValue(error.message || 'Something went wrong');
  }
});

// Redux slice
const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      const { id, updatedData } = action.payload;
      const user = state.users.find((user) => user.id === id);
      if (user) {
        Object.assign(user, updatedData);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload; // Update with fetched users
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch users';
      })
      // Create User
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users.push(action.payload); // Add the created user to the list
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to create user';
      });
  },
});

export const { addUser, removeUser, updateUser } = userSlice.actions;

export default userSlice.reducer;