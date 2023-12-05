import React from "react";
import {Provider} from "react-redux";
import { configureStore,combineReducers } from '@reduxjs/toolkit';
import loginSlice from"../context/features//auth/loginSlice";
import userSlice from "../context/features/user/userSlice";
import messageSlice from "../context/features/message/messageSlice";



const UserProvider=({children})=>{

    const rootReducer = combineReducers({

        login:loginSlice,
        user:userSlice,
        message:messageSlice,


      });
    const store =configureStore({
        reducer: rootReducer,
    })

    
    

    return <Provider store={store}>{children}</Provider>
}

export default UserProvider;
