import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: null,
  token: null,
  bookmarks: [],
  following: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.bookmarks = action.payload.bookmarks;
      state.following = action.payload.following;
    },
    setLogout: (state) => {
      state.id = null;
      state.name = null;
      state.token = null;
      state.bookmarks = [];
      state.following = [];
    },
    setBookmarks: (state, action) => {
      state.bookmarks = action.payload;
    },
    setFollowing: (state, action) => {
      state.following = action.payload;
    },
  },
});

export const { setAuth, setLogout, setBookmarks, setFollowing } =
  authSlice.actions;

export default authSlice.reducer;
