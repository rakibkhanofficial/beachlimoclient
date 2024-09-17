import axios, { type AxiosInstance, type RawAxiosRequestHeaders } from "axios";
import { getSession } from "next-auth/react";
import type { Session } from "next-auth";

type CustomSession = Session & {
  user: Session["user"] & {
    name?: string | null;
    id: string;
    _id: string;
    username: string;
    email?: string | null;
    role?: string | null;
    accessToken?: string | null;
  };
};

export const apiSetup = async () => {
  const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });
  const session = (await getSession()) as CustomSession | null;

  if (session?.user?.accessToken) {
    const commonHeaders: RawAxiosRequestHeaders = {
      "X-Frame-Options": "DENY",
      Authorization: `Bearer ${session.user.accessToken}`,
    };

    if (api && api.defaults && api.defaults.headers) {
      api.defaults.headers.common = {
        ...api.defaults.headers.common,
        ...commonHeaders,
      };
    }
  }

  return api;
};
