export const ACTIONS = {
  CHANGE_PASSWORD: "change_password",
  SET_USER: 'login/set_user',
  LOGOUT: 'login/logout',
  SET_PROFILE: "login/set_profile",
  RESET_PASSWORD: "login/reset_password",
  SEND_OTP: "login/send_otp",
  SET_LOADING: 'login/set_loading',
  PANELUSER_LOGOUT:'login/paneluser_logout',
  GET_FIREBASE_NOTIFICATION:'login/get_leads',
  GET_USER_DETAILS:"login/get_user_details",
  GET_USER:"login/get_user_data",
};

interface SetUser {
  type: typeof ACTIONS.SET_USER
  payload: Array<string | number>
}
interface GetUserDetails {
    type: typeof ACTIONS.GET_USER_DETAILS
    payload: Array<any>
}
interface GetUserDeta {
    type: typeof ACTIONS.GET_USER
    payload: Array<any>
}
interface Logout {
  type: typeof ACTIONS.LOGOUT
  payload: any
}
interface PanelUserLogout {
  type: typeof ACTIONS.PANELUSER_LOGOUT
  payload: any
}
interface SetProfile {
  type: typeof ACTIONS.SET_PROFILE;
  payload: object;
}
interface ResetPassword {
  type: typeof ACTIONS.RESET_PASSWORD;
  payload: object;
}
interface FireBaseToken {
  type: typeof ACTIONS.GET_FIREBASE_NOTIFICATION;
  payload: object;
}
interface SendOTP {
  type: typeof ACTIONS.SEND_OTP;
  payload: object;
}

interface SetLoadng {
  type: typeof ACTIONS.SET_LOADING
  payload: boolean
}


export type LoginActionTypes = SetUser | Logout | SetProfile | SetLoadng | ResetPassword | PanelUserLogout | FireBaseToken | GetUserDetails | GetUserDeta | SendOTP