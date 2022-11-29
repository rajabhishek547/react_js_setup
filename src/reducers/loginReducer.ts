import { ACTIONS, LoginActionTypes } from '../interfaces/actionTypes/loginTypes';
import SecureStorage from "../config/SecureStorage";

type LoginInitialState = {
  user: object;
  status: boolean;
  success: boolean;
  otp: any;
  userDetails: Array<any>;
  passwordStatus: boolean;
  loading: boolean;
}

const initialState: LoginInitialState = {
  user: {
    username: "",
    email: "",
    age: 0
  },
  status: false,
  success: false,
  otp: false,
  userDetails:[],
  passwordStatus:true,
  loading: false
};

const userReducer = (state = initialState, action: LoginActionTypes) => {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        status: true
      };
    case ACTIONS.GET_USER:
      return {
        ...state,
        passwordStatus: action.payload,
        status: true
      };
    case ACTIONS.RESET_PASSWORD:
      return {
        ...state,
        success: action.payload,
      };
    case ACTIONS.SEND_OTP:
      return {
        ...state,
        otp: action.payload,
      };
    case ACTIONS.LOGOUT:
      SecureStorage.removeItem("token");
      window.location.href = '/';
      return {
        ...state,
        ...initialState
      };
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
     case ACTIONS.GET_USER_DETAILS:
            return {
                ...state,
                userDetails: action.payload,
                loading: false,
            };
    default:
      return state;
  }
};

export default userReducer;
