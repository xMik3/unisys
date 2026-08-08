import {apiRequest} from "./apiClient";
import type {LoginRequest, LoginResponse} from "../types/login";
import type {UserType} from "../types/models";

export function login(userID: string, userPWD: string, userType: UserType) {
  const body: LoginRequest = {userID, userPWD, userType};
  return apiRequest<LoginResponse>("/login", {method: "POST", body});
}
