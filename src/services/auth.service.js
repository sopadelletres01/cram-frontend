import httpC from './httpConfig';

export default class AuthService {
  static async userIsAuth(storedToken) {
    return httpC.get(`/auth/verify`, { headers: { Authorization: `Bearer ${storedToken}` } });
  }

  static signup(data) {
    console.log(data);
    return httpC.post('/auth/register', data);
  }
  static register(data) { 
    console.log(data)
    return httpC.post("/auth/register-free", data)
}
  static signin(data, remember) {
    console.log('data', data);
    return httpC.post('/auth/login', { ...data, remember });
  }
  static signout() {
    /* tien que enrutar el logout */
    return httpC.post('/auth/logout');
  }
  static forgotPassword(data) {
    /* tien que enrutar el logout */
    return httpC.post('/auth/forgot', data);
  }
  static resetPassword(data) {
    /* tien que enrutar el logout */
    return httpC.post('/auth/reset', data);
  }
  static resend(data) {
    /* tien que enrutar el logout */
    return httpC.post(`/auth/resend/${data.email}`);
  }
}
