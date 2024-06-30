import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isMenuOpen: false,
    smallCardVideos: false,
    isSearchListOpen: false,
    isError: null,
    videos: [],
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    openMenu: (state) => {
      state.isMenuOpen = true;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    sideListVidos: (state) => {
      state.smallCardVideos = true;
    },
    closeSideListVidos: (state) => {
      state.smallCardVideos = false;
    },
    openSearchList: (state) => {
      state.isSearchListOpen = true;
    },
    closeSearchList: (state) => {
      state.isSearchListOpen = false;
    },
    setError: (state, action) => {
      state.isError = action.payload;
    },
    addVideos: (state, { payload }) => {
      state.videos = payload;
    },
  },
});

export const {
  toggleMenu,
  closeMenu,
  sideListVidos,
  openSearchList,
  openMenu,
  closeSideListVidos,
  closeSearchList,
  setError,
  addVideos,
} = appSlice.actions;

export default appSlice.reducer;
