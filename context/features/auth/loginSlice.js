import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { setUser,userLoggedOut } from '../user/userSlice';
import { showMessage } from "../message/messageSlice";

import { deleteTokenFromCookie, storeTokenInCookie } from "../lib/common";



export const submitLogin =
  ( username, password ) =>
  async (dispatch) => {

    try {
      dispatch(loginLoading());
      const response = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/appname/token/login/",  // bu api authenticate olmasına dair bir izin ile ÇALIŞMAZ.
        data: {
          username,
          password,
        },
      });
      console.log("/auth/token/login/:",response)
      if (!response?.data?.token) {
        console.log("Something went wrong during signing in: ", response);
        dispatch(loginError(response));
        return;
      }
      storeTokenInCookie(response.data.token);

      
      
      try {
        axios.defaults.headers.common[
          "Authorization"
        ] = `token ${response.data.token}`;

        
        const res = await axios.get("http://127.0.0.1:8000/api/appname/auth/users/me/");
        dispatch(setUser(res.data));
        console.log("kullanıcı-bilgileri:",res.data)
      } catch (err) {
        console.log("Kullanıcı bilgileri getirilemedi.");
      }
      dispatch(loginSuccess());
      dispatch(
        showMessage({
          message: "başarılı",
          variant: "success",
        })
      );
      console.log("başarılı")


    } catch (err) {
      console.log("Some error occured during signing in: ", err);
      err?.response?.data?.non_field_errors?.map((error) => {
        dispatch(
          showMessage({
            message: error,
            variant: "error",
          })
        );
        dispatch(loginError(error));
      });
      if (err?.response?.data?.detail)
        dispatch(loginError(err?.response?.data?.detail));
    } finally {
      dispatch(loginLoadingDone());
    }

  };

export const submitLogout = () => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url: API_ROUTES.LOGOUT, 
    });
    if (response?.data?.detail) {
      console.log("Something went wrong during logout: ", response);
      dispatch(loginError(response));
      return;
    }

    axios.defaults.headers.common["Authorization"] = null;
    deleteTokenFromCookie();
    dispatch(userLoggedOut());
    dispatch(logout());
    dispatch(
      showMessage({
        message: "Oturum kapatıldı.",
        variant: "success",
      })
    );

    
  } catch (err) {
    console.log("Some error occured during signing in: ", err);
    err?.response?.data?.non_field_errors?.map((error) => {
      dispatch(
        showMessage({
          message: error,
          variant: "error",
        })
      );
      // dispatch(loginError(error));
    });
  } finally {
    // dispatch(loginLoadingDone());
  }
};


const initialState= {
  success: false,
  loading: false,
  errors: [],
}

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginLoading: (state, action) => {
      state.loading = true;
    },
    loginLoadingDone: (state, action) => {
      state.loading = false;
    },
    loginSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
    },
    loginError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
    },
    logout: (state) => {
      state.success = false;
    },
  },
});

export const {
  loginLoading,
  loginLoadingDone,
  loginSuccess,
  loginError,
  logout,
} = loginSlice.actions;

export default loginSlice.reducer;
