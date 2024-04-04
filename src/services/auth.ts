import { ENDPOINTS } from "@/constants/api";
import { LOCAL_STORAGE_KEY } from "@/constants/storage-key";
import { API } from "@/lib/api-client";
import { SignInParam, SignUpParam } from "@/types/request/auth";
import { User } from "@/types/response/auth";

export function signIn() {
  const url = ENDPOINTS.AUTH.SIGNIN;

  return {
    mutationKey: [url],
    mutationFn: ({ email, password }: SignInParam) => {
      return API.post(url, {
        email,
        password,
      });
    },
  };
}

export function signUp() {
  const url = ENDPOINTS.AUTH.SIGNUP;

  return {
    mutationKey: [url],
    mutationFn: ({ name, email, password }: SignUpParam) => {
      return API.post(url, {
        name,
        email,
        password,
      });
    },
  };
}

export const userMutationKey = ["mutate-user"];
export const queryUserKey = ["user"];

export function saveSession(user: User) {
  localStorage.setItem(LOCAL_STORAGE_KEY.USER, JSON.stringify(user));
  localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, user?.token || "");
  return user;
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null;

  const userString = localStorage.getItem(LOCAL_STORAGE_KEY.USER);

  if (!userString) return null;

  return JSON.parse(userString);
}

export function updateUserData(user: User) {
  const oldUserData = getUser();

  if (!oldUserData) return null;

  const newUserData = {
    ...oldUserData,
    ...user,
  };

  localStorage.setItem(LOCAL_STORAGE_KEY.USER, JSON.stringify(newUserData));

  return newUserData;
}

export function clearSession() {
  localStorage.removeItem(LOCAL_STORAGE_KEY.USER);
  localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN);
}

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN) || "";
  }

  return "";
};
