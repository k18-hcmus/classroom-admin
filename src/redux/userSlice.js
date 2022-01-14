import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axiosClient from '../axiosClient'

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await axiosClient.get('/api/user')
  return response.data
})
export const updateUser = createAsyncThunk('users/updateUser', async (User) => {
  const response = await axiosClient.put('/api/user', User)
  return response.data
})

const initialState = {
  user: {},
  isLogged: false,
  message: '',
  role: '',
  loading: true,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.isLogged = true
      state.user = action.payload
      state.loading = false
    },
    userLogout: (state) => {
      state.user = undefined
      state.isLogged = false
      state.message = ''
      state.role = ''
      state.loading = false
      localStorage.clear()
    },
    userSetRole: (state, action) => {
      state.role = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      state.loading = true
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.user = action.payload
      state.loading = false
    },
    [fetchUser.rejected]: (state, action) => {
      state.loading = false
    },
    [updateUser.fulfilled]: (state, action) => {
      state.user = action.payload.user
      state.message = action.payload.message
    },
  },
})

const { actions, reducer } = userSlice

export const { userLogin, userLogout, userSetRole, setLoading } = actions

// selector
export const selectLoadingUser = (state) => state.user.loading
export const selectUser = (state) => state.user.user

export default reducer
