import {createContext} from "react";
import type {UserType} from "../types/models";

export type AuthContextValue = {
  token: string | null;
  userType: UserType | null;
  isAuthenticated: boolean;
  login: (userID: string, userPWD: string, userType: UserType) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
