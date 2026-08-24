import type {ErrorResponse, SuccessResponse, UserType} from "./general.js"


//request
export type LoginRequest = {
    userID : string;
    userPWD : string;
    userType : UserType;
}


//token
export type TokenPayload = {
    userID : number;
    userType : UserType;
}


//response
export type LoginSuccess = SuccessResponse & {
    token : string;
}

export type LoginResponse = LoginSuccess | ErrorResponse;