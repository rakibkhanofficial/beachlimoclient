import { useSession } from "next-auth/react";
import type { Session } from "next-auth";

type CustomUser = Session["user"] & {
  name?: string | null;
  userId: string;
  _id: string;
  id: string | null;
  username: string;
  email?: string | null;
  phone?: string | null;
  role?: string | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  access_tokenExpiresIn?: string | null;
  refresh_tokenExpiresIn?: string | null;
};

type CustomSession = Omit<Session, "user"> & {
  user: CustomUser;
};

export const useCustomSession = () => {
  const {
    data: session,
    status,
    update,
  } = useSession() as {
    data: CustomSession | null;
    status: "loading" | "authenticated" | "unauthenticated";
    update: (data?: Partial<CustomSession>) => Promise<CustomSession | null>;
  };

  return {
    session,
    status,
    update,
  };
};
