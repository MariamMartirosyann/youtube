import { createSlice } from "@reduxjs/toolkit";

const appSlice=createSlice({
    name:"app",
    initialState:{
        isMenuOpen:false,
        smallCardVideos:false,
        isSearchListOpen:false,
        isError:null,
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
        },
        setError:(state, action)=>{
            state.isError=action.payload
        }
    }
})

export const{toggleMenu, closeMenu,sideListVidos,openSearchList,openMenu,closeSideListVidos,closeSearchList,setError}=appSlice.actions

export default appSlice.reducer