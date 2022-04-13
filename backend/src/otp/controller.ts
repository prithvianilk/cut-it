import axios from "../utils/axios";
import { Request, Response } from "express";
import {
  SWIGGY_DAPI_URL,
  SWIGGY_OTP_VERIFY_URL,
  SWIGGY_SMS_OTP_URL,
} from "../constants";
import { users } from "../utils/values";

const startSession = async (phone: number) => {
  try {
    await axios.get(SWIGGY_DAPI_URL);
    //TODO clean this code
    return { csrfToken: "", swiggyCookieValue: "" };
  } catch (error: any) {
    const { headers, data } = error.response;
    const { csrfToken } = data;
    const setCookieList = headers["set-cookie"];
    users.create(phone, csrfToken);
    users.add(phone, setCookieList);
  }
};

export const sendOTP = async (request: Request, response: Response) => {
  const { phone } = request.body;
  console.log(phone);
  await startSession(phone);
  await requestOTP(phone).catch((error: any) => {console.log(error)});
  response.send();
  console.log("OTP sent");
};

export const verifyOTP = async (request: Request, response: Response) => {
  const { otp, phone } = request.body;
  const _csrf = users.getCsrf(phone);
  const Cookie = users.generate(phone);
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
  users.add(phone, setCookieList);
  response.send({ data, headers });
};

const requestOTP = async (phone: number) => {
  const { data } = await axios.post(
    SWIGGY_SMS_OTP_URL,
    {
      phone,
      _csrf: users.getCsrf(phone),
    },
    {
      headers: {
        Cookie: users.generate(phone),
      },
    }
  );
  const { sid, tid, deviceId } = data;
  users.add(phone, [
    `_tid=${tid};`,
    `_sid=${sid};`,
    `_guest_tid=${tid};`,
    `_device_id=${deviceId};`,
  ]);
};
