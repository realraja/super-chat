import { createSlice } from "@reduxjs/toolkit";

const authSlicer = createSlice({
  name: "auth",
  initialState: {
    user:null,
    userData:{},
    isAdmin:false,
    loading:true,
    isLogout:null
  },
  reducers: {
    login: (state,action) =>{
        state.user = action.payload._id;
        state.userData = action.payload;
        state.loading = false;
    },
    logout: (state,action) =>{
        state.user = null;
        state.userData = {};
        state.loading = false;
        state.isLogout = 'logout';
    }
  },
  extraReducers(builder){}
});


export const {login, logout} = authSlicer.actions;

export default authSlicer;