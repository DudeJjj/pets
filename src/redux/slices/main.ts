import { createSlice } from '@reduxjs/toolkit'

export interface MainState {
  menuOpen: boolean;
  imageOpen: boolean;
}

const initialState: MainState = {
  menuOpen: false,
  imageOpen: false,
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen
    },
    toggleImage: (state) => {
      state.imageOpen = !state.imageOpen
    },
  },
})
export const {toggleMenu, toggleImage } = mainSlice.actions

export default mainSlice.reducer
