
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listData: "fff",
  otherData:"other",
  stateList:"",
  token:"",
  userData:""
}

export const projectReducer = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setListData: (state, action) => {
      console.log(action.payload)
      state.listData = action.payload
    },
    setStateList: (state, action) => {
      console.log(action.payload)
      state.stateList = action.payload
    },
    setUserData: (state, action) => {
      console.log(action.payload)
      state.userData = action.payload
    },
    setToken: (state, action) => {
      console.log(action.payload)
      state.token = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setListData,setStateList, setToken,setUserData } = projectReducer.actions

export default projectReducer.reducer;



