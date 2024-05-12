import { createSlice } from "@reduxjs/toolkit";

const appSlice=createSlice({
    name:"app",
    initialState:{
        isMenuOpen:true,
        smallCardVideos:false
    },
    reducers:{
        toggleMenu:(state)=>{
            state.isMenuOpen=!state.isMenuOpen
        }, 
        closeMenu:(state)=>{
            state.isMenuOpen=false
        },
        sideListVidos:(state)=>{
            state.smallCardVideos=true
        }
    }
})

export const{toggleMenu, closeMenu,sideListVidos}=appSlice.actions

export default appSlice.reducer