import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
 name:'user',
 initialState:{
  currentUser:null,
  isFetching:false,
  error:false
 },
 reducers:{
  loginStart:(state)=>{
   state.isFetching = true
  },
  loginSuccess:(state,action)=>{
   state.currentUser=action.payload
   state.isFetching=false
  },
  loginFailure:(state)=>{
   state.isFetching=false
   state.error=true
  },
  updateInfo:(state,action)=>{
   state.currentUser=action.payload
  }
 }
})

export const {loginStart,loginSuccess,loginFailure,updateInfo} = userSlice.actions
export default userSlice.reducer