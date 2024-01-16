interface CommonState {
  cardActive: boolean | null
  cardZoom: number | null
  cardRotationActive: boolean
  scrollActive: boolean
  cameraPositionZ: number | null
  colsNumber: number | null
  cardsYOffset: number | null
  scrollHeight: number | null
}

interface BreakpointDetails {
  cameraPositionZ: number
  cardZoom: number
  colsNumber: number
  cardsYOffset: number
  scrollHeight: number
}

interface Breakpoints {
  mobile: BreakpointDetails
  tablet: BreakpointDetails
  desktop: BreakpointDetails
}

export type Breakpoint = 'mobile' | 'tablet' | 'desktop'

interface AppState {
  common: CommonState
  breakpoints: Breakpoints
  currentBreakpoint: 'mobile' | 'tablet' | 'desktop'
  currentBreakpointLoaded: boolean
}

const initialState: AppState = {
  common: {
    cardActive: null,
    cardZoom: null,
    cardRotationActive: true,
    scrollActive: true,
    cameraPositionZ: null,
    colsNumber: null,
    cardsYOffset: null,
    scrollHeight: null,
  },
  breakpoints: {
    mobile: {
      cameraPositionZ: 8,
      cardZoom: 6.5,
      colsNumber: 1,
      cardsYOffset: 2,
      scrollHeight: -11,
    },
    tablet: {
      cameraPositionZ: 10,
      cardZoom: 5,
      colsNumber: 2,
      cardsYOffset: 3,
      scrollHeight: -1,
    },
    desktop: {
      cameraPositionZ: 6,
      cardZoom: 2.7,
      colsNumber: 2,
      cardsYOffset: 1,
      scrollHeight: -5,
    },
  },
  currentBreakpoint: 'desktop',
  currentBreakpointLoaded: false,
}

export default initialState
