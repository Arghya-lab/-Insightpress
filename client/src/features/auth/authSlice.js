import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: null,
  name: null,
  token: null,
  bookmarks: [],
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.token = action.payload.token
      state.bookmarks = action.payload.bookmarks
    },
    setLogout: (state) => {
      state.id = null
      state.name = null
      state.token = null
      state.bookmarks = []
    },
    setBookmarks: (state, action) => {
      state.bookmarks = action.payload
    },
  },
})

export const { setAuth, setLogout, setBookmarks } = authSlice.actions

export default authSlice.reducer