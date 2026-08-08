import {useState} from "react";
import type {ReactNode} from "react";
import {AuthContext} from "./authContext";
import {login as loginRequest} from "../api/authService";
import type {UserType} from "../types/models";

const STORAGE_KEY = "auth";

type StoredAuth = {
  token: string;
  userType: UserType;
};

function readStoredAuth(): StoredAuth | null {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StoredAuth;
  } catch {
    return null;
  }
}

export function AuthProvider({children}: {children: ReactNode}) {
  const [auth, setAuth] = useState<StoredAuth | null>(readStoredAuth);

  async function login(userID: string, userPWD: string, userType: UserType) {
    const response = await loginRequest(userID, userPWD, userType);
    const nextAuth: StoredAuth = {token: `Bearer ${response.token}`, userType};
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextAuth));
    setAuth(nextAuth);
  }

  function logout() {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuth(null);
  }

  const value = {
    token: auth?.token ?? null,
    userType: auth?.userType ?? null,
    isAuthenticated: auth !== null,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
