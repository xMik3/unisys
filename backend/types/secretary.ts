import type {ApiResponse,Course,Teacher,Student,SuccessResponse, ErrorResponse} from "./general.js";

//request

//create request
export type CreateCourseRequest = {
    courseName : string;
    courseSemester : number;
    teacherID : string;
}

export type CreateStudentRequest = {
    studentName : string;
    studentSurname : string;
    studentPWD : string;
    studentEnrollmentYear : number;
}

export type CreateTeacherRequest = {
    teacherName : string;
    teacherSurname : string;
    teacherPWD : string;
}


//edit request
export type EditCourseRequest = CreateCourseRequest;

export type EditStudentRequest = {
    studentName : string;
    studentSurname : string;
    studentPWD : string;
}

export type EditTeacherRequest = CreateTeacherRequest;


//responses

//create response
export type CreateCourseSuccessResponse = SuccessResponse & {
    courseID : string;
}

export type CreateCourseResponse = CreateCourseSuccessResponse | ErrorResponse;


export type CreateStudentSuccessResponse = SuccessResponse & {
    studentID : string;
}

export type CreateStudentResponse = CreateStudentSuccessResponse | ErrorResponse;


export type CreateTeacherSuccessResponse = SuccessResponse & {
    teacherID : string;
}

export type CreateTeacherResponse = CreateTeacherSuccessResponse | ErrorResponse;


//get response
export type GetCourseSuccessResponse = SuccessResponse & {
    course : Course;
}

export type GetCourseResponse = GetCourseSuccessResponse | ErrorResponse;


export type GetCoursesSuccessResponse = SuccessResponse & {
    courses : Course[];
}

export type GetCoursesResponse = GetCoursesSuccessResponse | ErrorResponse;


export type GetStudentSuccessResponse = SuccessResponse & {
    student : Student;
}

export type GetStudentResponse = GetStudentSuccessResponse | ErrorResponse;


export type GetStudentsSuccessResponse = SuccessResponse & {
    students : Student[];
}

export type GetStudentsResponse = GetStudentsSuccessResponse | ErrorResponse;


export type GetTeacherSuccessResponse = SuccessResponse & {
    teacher : Teacher;
}

export type GetTeacherResponse = GetTeacherSuccessResponse | ErrorResponse;


export type GetTeachersSuccessResponse = SuccessResponse & {
    teachers : Teacher[];
}

export type GetTeachersResponse = GetTeachersSuccessResponse | ErrorResponse;


//edit reponse
export type EditCourseResponse = ApiResponse;

export type EditStudentResponse = ApiResponse;

export type EditTeacherResponse = ApiResponse;

export type RemoveCourseResponse = ApiResponse;

export type RemoveStudentResponse = ApiResponse;

export type RemoveTeacherResponse = ApiResponse;

export type AdvanceSemesterResponse = ApiResponse;
