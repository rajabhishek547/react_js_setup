import AXIOS from "../config/Axios";
import Prefix from "../config/ApiPrefix"
import decode from 'jwt-decode';
import SecureStorage from "../config/SecureStorage";

const Auth = {

  login(data: object) {
    return AXIOS.post(`${Prefix.api}/auth/users/login/`, {
      ...data
    });
  },

  checkLogin() {
    const token = SecureStorage.getItem('token');
    if (token) {
      const decoded: any = decode(token);
      if (!!token && !this.isTokenExpired(decoded)) {
        const { is_staff, user_group, uuid } = decoded;
        return { user: { is_staff, user_group, uuid } }
      } else {
        return { user: {} }
      }
    } else {
      return { user: {} }
    }
  },

  findAccessToken(data: object) {
    return AXIOS.post(`${Prefix.api}/auth/token-refresh/`, {
      ...data
    });
  },


  // findAccessToken() {
  //   const rtoken = SecureStorage.getItem('refrestoken');
  //   if (rtoken) {
  //     const decoded: any = decode(rtoken);
  //     if (!!rtoken && !this.isTokenExpired(decoded)) {
  //       let token = 'aaaaaaa';
  //       const decoded: any = decode(token)
  //       const { is_staff, user_group, uuid } = decoded;
  //       return { user: { is_staff, user_group, uuid } }
  //     } else {
  //       return { user: {} }
  //     }
  //   } else {
  //     return { user: {} }
  //   }
  // },

  setProfile() {
    return AXIOS.get(`${Prefix.api}/auth/profile/`, {
      headers: { Authorization: `Token ${SecureStorage.getItem("token")}` },
    });
  },

  isTokenExpired(decoded: any) {
    try {
      if (decoded.exp < Date.now() / 1000) { // Checking if token is expired.
        return true;
      }
      else
        return false;
    }
    catch (err: any) {

      return false;
    }
  }
};

export default Auth;
