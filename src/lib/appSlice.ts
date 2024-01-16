import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import initialState, { Breakpoint } from './initialState'

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCardActive: (state, action: PayloadAction<boolean | null>) => {
      state.common.cardActive = action.payload
    },
    setScrollActive: (state, action: PayloadAction<boolean>) => {
      state.common.scrollActive = action.payload
      state.common.cardRotationActive = action.payload
    },
    setViewportSize: (state, action: PayloadAction<Breakpoint>) => {
      state.currentBreakpoint = action.payload
      const breakpointSettings = state.breakpoints[action.payload]
      if (breakpointSettings) {
        state.common = {
          ...state.common,
          cameraPositionZ: breakpointSettings.cameraPositionZ,
          cardZoom: breakpointSettings.cardZoom,
          colsNumber: breakpointSettings.colsNumber,
          cardsYOffset: breakpointSettings.cardsYOffset,
          scrollHeight: breakpointSettings.scrollHeight,
        }
      }
      state.currentBreakpointLoaded = true
    },
  },
})

// Aktionen exportieren
export const { setCardActive, setViewportSize, setScrollActive } = appSlice.actions

// Reducer exportieren
export default appSlice.reducer
