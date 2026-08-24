import type {ApiResponse,AvailableCourse,RegisteredCourse,SuccessResponse, ErrorResponse} from "./general.js";


//request
export type RegisterCoursesRequest = {
    courses : string[];
}


//response

//get response
export type GetRegisteredCoursesSuccessResponse = SuccessResponse & {
    courses : RegisteredCourse[];
}

export type GetRegisteredCoursesResponse = GetRegisteredCoursesSuccessResponse | ErrorResponse;


export type GetAvailableCoursesSuccessResponse = SuccessResponse & {
    courses : AvailableCourse[];
}

export type GetAvailableCoursesResponse = GetAvailableCoursesSuccessResponse | ErrorResponse;


export type RegisteredCoursesCount = {
    registeredCourses : number;
}

//register response
export type RegisterCoursesResponse = ApiResponse;

export type UnregisterCourseResponse = ApiResponse;
