import { createSlice } from "@reduxjs/toolkit";

const appSlice=createSlice({
    name:"app",
    initialState:{
        isMenuOpen:true,
        smallCardVideos:false,
        isSearchListOpen:false
    },
    reducers:{
        toggleMenu:(state)=>{
            state.isMenuOpen=!state.isMenuOpen
        }, 
        openMenu:(state)=>{
            state.isMenuOpen=true
        },
        closeMenu:(state)=>{
            state.isMenuOpen=false
        },
        sideListVidos:(state)=>{
            state.smallCardVideos=true
        },
        closeSideListVidos:(state)=>{
            state.smallCardVideos=false
        },
        openSearchList:(state)=>{
            state.isSearchListOpen=true
        },
        closeSearchList:(state)=>{
            state.isSearchListOpen=false
        }
    }
})

export const{toggleMenu, closeMenu,sideListVidos,openSearchList,openMenu,closeSideListVidos,closeSearchList}=appSlice.actions

export default appSlice.reducer