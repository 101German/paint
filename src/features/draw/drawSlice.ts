import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface DrawState {
  drawList: string []
}

const initialState: DrawState = {
  drawList: ["fadf", "dfag"],
}

export const drawSlice = createSlice({
  name: 'drawList',
  initialState,
  reducers: {
    initDraws: (state, action: PayloadAction<string[]>) => {
      state.drawList = action.payload
    },
    addDraws: (state, action: PayloadAction<string>) => {
      state.drawList.push(action.payload)
    }
  }
})

// Action creators are generated for each case reducer function
export const { initDraws, addDraws } = drawSlice.actions

export const drawReducer = drawSlice.reducer
