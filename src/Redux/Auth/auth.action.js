import axios from "axios";
import Cookies from 'universal-cookie';

import {
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./auth.types";

const cookies = new Cookies();

export const login = (creds) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING });
  try {
    let res = await axios.post("http://localhost:8080/api/auth/signin", creds);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    console.log(res.data);
    cookies.set('userData', res.data);
  } catch (e) {
    dispatch({ type: LOGIN_ERROR, payload: e.message });
    alert("login fail")
  }
};

export const logout = () => ({ type: LOGOUT });