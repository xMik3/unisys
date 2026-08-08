import type {ApiResponse, UserType} from "./models";

export type LoginRequest = {
  userID: string;
  userPWD: string;
  userType: UserType;
};

export type LoginResponse = ApiResponse & {
  token: string;
};

