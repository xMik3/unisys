import type {ApiResponse,ManagedCourse,ManagedStudent,SuccessResponse, ErrorResponse} from "./general.js";


//request
export type GradeStudentRequest = {
    grade : number;
}


//response

//get response
export type GetManagedCoursesSuccessResponse = SuccessResponse & {
    courses : ManagedCourse[];
}

export type GetManagedCoursesResponse = GetManagedCoursesSuccessResponse | ErrorResponse;


export type GetManagedStudentsSuccessResponse = SuccessResponse & {
    students : ManagedStudent[];
}

export type GetManagedStudentsResponse = GetManagedStudentsSuccessResponse | ErrorResponse;


//grade response
export type GradeStudentResponse = ApiResponse;
