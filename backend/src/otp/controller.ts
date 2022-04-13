import axios from "../utils/axios";
import { Request, Response } from "express";
import {
  SWIGGY_DAPI_URL,
  SWIGGY_OTP_VERIFY_URL,
  SWIGGY_SMS_OTP_URL,
} from "../constants";
import { users } from "../utils/values";
//TODO must be persisted

const startSession = async (mobile: number) => {
  try {
    await axios.get(SWIGGY_DAPI_URL);
    //TODO clean this code
    return { csrfToken: "", swiggyCookieValue: "" };
  } catch (error: any) {
    const { headers, data } = error.response;
    const { csrfToken } = data;
    const setCookieList = headers["set-cookie"];
    users.create(mobile, csrfToken);
    users.add(mobile, setCookieList);
    console.log(setCookieList);
    console.log(users.generate(mobile));
    for (let i = 0; i < 10; ++i) {
      console.log("-");
    }
  }
};

export const sendOTP = async (request: Request, response: Response) => {
  const { mobile } = request.body;
  await startSession(mobile);
  await requestOTP(mobile);
  response.send();
};

export const verifyOTP = async (request: Request, response: Response) => {
  const { otp, mobile } = request.body;
  const _csrf = users.getCsrf(mobile);
  const Cookie = users.generate(mobile);
  console.log(_csrf, Cookie);
  for (let i = 0; i < 10; ++i) {
    console.log("*");
  }
  const { data, headers } = await axios.post(
    SWIGGY_OTP_VERIFY_URL,
    {
      otp,
      _csrf,
    },
    {
      headers: {
        Cookie,
      },
    }
  );
  const setCookieList = headers["set-cookie"];
  console.log(setCookieList);
  users.add(mobile, setCookieList);
  console.log(users.generate(mobile));
  for (let i = 0; i < 10; ++i) {
    console.log("-");
  }
  response.send({ data, headers });
};

const requestOTP = async (mobile: number) => {
  const { data } = await axios.post(
    SWIGGY_SMS_OTP_URL,
    {
      mobile,
      _csrf: users.getCsrf(mobile),
    },
    {
      headers: {
        Cookie: users.generate(mobile),
      },
    }
  );
  const { sid, tid, deviceId } = data;
  users.add(mobile, [
    `_tid=${tid};`,
    `_sid=${sid};`,
    `_guest_tid=${tid};`,
    `_device_id=${deviceId};`,
  ]);
  console.log(users.generate(mobile));
  for (let i = 0; i < 10; ++i) {
    console.log("-");
  }
};
