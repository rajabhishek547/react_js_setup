import Auth from '../services/Auth';
import SecureStorage from '../config/SecureStorage'
import snackBarUpdate from '../actions/snackBarActions';
import { ACTIONS } from '../interfaces/actionTypes/loginTypes';
import AXIOS from '../config/Axios';
import Prefix from '../config/ApiPrefix';

export const login = (body: object) => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true })
  try {
    const {
      data,
      status
    } = await Auth.login({ user: body });
    let authResponse: any = [];
    if (status === 200 || status === 201) {
      authResponse = {
        data,
        status
      };
      const user = data.user.username;
      localStorage.setItem("USER_NAME",user)
      const passwordStatus=data.user.password_change
      
      const token = data.user.token;
      const accessToken = data.user.access;
      const refreshToken = data.user.refresh;
      SecureStorage.setItem('token', token);
      SecureStorage.setItem('accessToken', accessToken);
      SecureStorage.setItem('refreshToken', refreshToken);

      dispatch({type: ACTIONS.GET_USER, payload: passwordStatus })
      dispatch({ type: ACTIONS.SET_USER, payload: user })
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
    return authResponse;
  } catch (err:any) {
    let title = ''
    if (err.response) {
      const { status, data: { errors: { error } } } = err.response
      if (status === 400) {
        title = error
      }
    }
    snackBarUpdate({
      payload: {
        message: title || "Something went wrong",
        status: true,
        type: 'error',
      },
    })(dispatch);
    dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    throw err;
  }
};

export const getFirebaseNotification = (body: any) => async (dispatch: Function) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
        const { data } = await AXIOS.post(`${Prefix.api}/notification/token_save/`,
            body,
            { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
        );
        dispatch({ type: ACTIONS.GET_FIREBASE_NOTIFICATION, payload: data });
    } catch (err: any) {
        let title = "";
        if (err.response) {
            title = err.response.data.errors;
        } else {
            title = "Something went wrong!";
        }
        snackBarUpdate({
            payload: {
                message: title || "Something went wrong!",
                status: true,
                type: "error",
            },
        })(dispatch);
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
        throw err;
    }
};

export const resetPasswordReset = () => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.RESET_PASSWORD, payload: false });
  dispatch({ type: ACTIONS.SEND_OTP, payload: false });
}

export const resetPassword = (body: any) => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });
  try {
    const { data } = await AXIOS.post(`${Prefix.api}/auth/password_reset/confirm/`,
      body,
    );
    dispatch({ type: ACTIONS.RESET_PASSWORD, payload: data });
    dispatch({ type: ACTIONS.SET_LOADING, payload: false });
  } catch (err:any) {
    let title = "";
    if (err.response) {
      title = err.response.data.errors;
    } else {
      title = "Something went wrong!";
    }
    snackBarUpdate({
      payload: {
        message: title || "Something went wrong!",
        status: true,
        type: "error",
      },
    })(dispatch);
    dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    throw err;
  }
};
export const getUserDetails = (url: string) => async (dispatch: Function) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
        const { data } = await AXIOS.get(`${Prefix.api}/auth/shortprofile/`, {
            headers: { Authorization: `Token ${SecureStorage.getItem("token")}` },
        });
        dispatch({ type: ACTIONS.GET_USER_DETAILS, payload: data });
    } catch (err: any) {
        let title = "";
        if (err.response) {
            title = err.response.data.errors;
        } else {
            title = "Something went wrong!";
        }
        snackBarUpdate({
            payload: {
                message: title || "Something went wrong!",
                status: true,
                type: "error",
            },
        })(dispatch);
        dispatch({ type: ACTIONS.GET_USER_DETAILS, payload: [] });
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
        throw err;
    }
};
export const panelUserLogout = () => async (dispatch: Function) => {

  dispatch({ type: ACTIONS.SET_LOADING, payload: true });
  try {
    const { data } = await AXIOS.post(`${Prefix.api}/auth/users/paneluser/logout/`,
    {},
    { headers: { Authorization: `Token ${SecureStorage.getItem("token")}` } }
    );
    dispatch({ type: ACTIONS.PANELUSER_LOGOUT, payload: data });
    dispatch({ type: ACTIONS.SET_LOADING, payload: false });
  } catch (err:any) {
    let title = "";
    if (err.response) {
      title = err.response.data.errors;
    } else {
      title = "Something went wrong!";
    }
    snackBarUpdate({
      payload: {
        message: title || "Something went wrong!",
        status: true,
        type: "error",
      },
    })(dispatch);
    dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    throw err;
  }
};

export const sendOtp = (body: any) => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });
  try {
    const { data } = await AXIOS.post(`${Prefix.api}/auth/password_reset/`,
      body,
    );
    dispatch({ type: ACTIONS.SEND_OTP, payload: data });
    dispatch({ type: ACTIONS.SET_LOADING, payload: false });
  } catch (err:any) {
    let title = "";
    if (err.response) {
      title = err.response.data.errors;
    } else {
      title = "Something went wrong!";
    }
    snackBarUpdate({
      payload: {
        message: title || "Something went wrong!",
        status: true,
        type: "error",
      },
    })(dispatch);
    dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    throw err;
  }
};

export const logout = () => ({ type: ACTIONS.LOGOUT })

export const checkUser = () => async (dispatch: Function) => {

  try {
    const data = await Auth.checkLogin();
    let checkUserLoginResponse;

    if (Object.keys(data.user).length > 0) {
      checkUserLoginResponse = data;
      dispatch({ type: ACTIONS.SET_USER, payload: data });
    }
    return checkUserLoginResponse;
  } catch (error) {
    return error;
  }
};

export const setProfile = () => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });
  try {
    const { data } = await Auth.setProfile();
    dispatch({ type: ACTIONS.SET_PROFILE, payload: data });
  } catch (error) {
  }
};

export const refreshToken = () => async (dispatch: Function) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true })
  const rtoken = SecureStorage.getItem('refreshToken');
  try {
    const {
      data,
      status
    } = await Auth.findAccessToken({ refresh: rtoken });
    let authResponse: any = [];
    if (status === 200 || status === 201) {
      authResponse = {
        data,
        status
      };
      const accessToken = data.access;
      SecureStorage.setItem('accessToken', accessToken);
      return authResponse;
    }else if (status === 401) {
      return "logout";
    }else{
      return "logout";
    }
  } catch (err:any) {
    return "logout";
  }
};