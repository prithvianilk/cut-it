import axios from "../utils/axios";
import { Request, Response } from "express";
import {
  SWIGGY_DAPI_URL,
  SWIGGY_OTP_VERIFY_URL,
  SWIGGY_SMS_OTP_URL,
} from "../constants";
import { values } from "../utils/values";
//TODO must be persisted

const startSession = async () => {
  try {
    await axios.get(SWIGGY_DAPI_URL);
    //TODO clean this code
    return { csrfToken: "", swiggyCookieValue: "" };
  } catch (error: any) {
    const { headers, data } = error.response;
    const { csrfToken } = data;
    const setCookieList = headers["set-cookie"];
    const cookie = setCookieList[0];
    const swiggyCookieValue = cookie.substring(0, cookie.indexOf(";") + 1);
    return { csrfToken, swiggyCookieValue };
  }
};

export const sendOTP = async (request: Request, response: Response) => {
  const { mobile } = request.body;
  const { csrfToken, swiggyCookieValue } = await startSession();
  values.csrfToken = csrfToken;
  values.swiggyCookieValue = swiggyCookieValue;
  await requestOTP(mobile, csrfToken);
  response.send();
};

export const verifyOTP = async (request: Request, response: Response) => {
  const { otp } = request.body;
  const { data, headers } = await axios.post(
    SWIGGY_OTP_VERIFY_URL,
    {
      otp,
      _csrf: values.csrfToken,
    },
    {
      headers: {
        Cookie: values.swiggyCookieValue,
      },
    }
  );
  const setCookieList = headers["set-cookie"];
  if (setCookieList !== undefined) {
    const cookie = setCookieList[2];
    const sessionTidCookie = cookie.substring(0, cookie.indexOf(";") + 1);
    values.swiggyCookieValue += `; ${sessionTidCookie}`;
  }
  if (setCookieList !== undefined) {
    const cookie = setCookieList[1];
    const isLoggedInCookie = cookie.substring(0, cookie.indexOf(";") + 1);
    values.swiggyCookieValue += `; ${isLoggedInCookie}`;
  }
  console.log(values);
  response.send({ data, headers });
};

const requestOTP = async (mobile: number, csrfToken: string) => {
  const { data } = await axios.post(
    SWIGGY_SMS_OTP_URL,
    {
      mobile,
      _csrf: csrfToken,
    },
    {
      headers: {
        Cookie: values.swiggyCookieValue,
      },
    }
  );
  const { sid, tid, deviceId } = data;
  values.swiggyCookieValue += ` _tid=${tid}; _sid=${sid}; _guest_tid=${tid}; _device_id=${deviceId}`;
  console.log(values.swiggyCookieValue);
};
