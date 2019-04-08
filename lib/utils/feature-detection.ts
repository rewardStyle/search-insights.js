import { request as nodeHttpRequest } from "http";

export const supportsCookies = () => {
  try {
    return !!navigator.cookieEnabled;
  } catch (e) {
    return false;
  }
};

export const supportsSendBeacon = () => {
  try {
    console.log(">", window.navigator.sendBeacon);
    return !!navigator.sendBeacon;
  } catch (e) {
    return false;
  }
};

export const supportsXMLHttpRequest = () => {
  try {
    return !!window.XMLHttpRequest;
  } catch (e) {
    return false;
  }
};

export const supportsNodeHttpModule = () => {
  try {
    return !!nodeHttpRequest;
  } catch (e) {
    return false;
  }
};
