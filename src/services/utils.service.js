import httpC from "./httpConfig";

export default class UtilsService  {
  static getQRCode (uid,pid) {
    return httpC.get(`/QR/generate/${uid}/${pid}`);
  }
}
