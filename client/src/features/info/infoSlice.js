import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: "light",
  isSlideOpen: false,
  isModalOpen: false,
}

export const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setMode: (state, actions) => {
      state.mode = actions.payload
    },
    openSlide: (state) => {
      state.isSlideOpen = true
    },
    closeSlide: (state) => {
      state.isSlideOpen = false
    },
    openModal: (state) => {
      state.isModalOpen = true
    },
    closeModal: (state) => {
      state.isModalOpen = false
    },
  },
})

export const { setMode, openSlide, closeSlide, openModal, closeModal, } = infoSlice.actions

export default infoSlice.reducer