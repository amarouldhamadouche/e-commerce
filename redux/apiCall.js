import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("auth/login", user);
    dispatch(loginSuccess(res.data));
    return true
  } catch (err) {
    dispatch(loginFailure());
    return false
  }
};

export const register = async (dispatch, user) => {
 dispatch(loginStart());
 try {
   const res = await publicRequest.post("auth/register", user);
   dispatch(loginSuccess(res.data));
   return true
 } catch (err) {
   dispatch(loginFailure());
   
   return false
 }
};