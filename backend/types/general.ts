export type UserType = "Student" | "Teacher" | "Secretary";


//responses
export type SuccessResponse = {
    status : "success";
    message : string;
}

export type ErrorResponse = {
    status : "error";
    message : string;
}

export type ApiResponse = SuccessResponse | ErrorResponse;


//parameters
export type CourseIDParam = {
    courseID : string;
}

export type StudentIDParam = {
    studentID : string;
}

export type TeacherIDParam = {
    teacherID : string;
}

export type YearParam = {
    year : string;
}

export type ManagedStudentParams = CourseIDParam & StudentIDParam;


//course entities
type CourseColumns = {
    ID : string;
    Name : string;
    Semester : number;
}

export type Course = CourseColumns & {
    TeacherID : string | null;
    TeacherName : string | null;
    TeacherSurname : string | null;
}

export type RegisteredCourse = CourseColumns & {
    Grade : string | null;
    TeacherName : string | null;
    TeacherSurname : string | null;
}

export type AvailableCourse = CourseColumns;

export type ManagedCourse = CourseColumns;


//student entities
export type Student = {
    ID : string;
    Name : string;
    Surname : string;
    Semester : number;
    EnrollmentYear : number;
}

export type ManagedStudent = {
    ID : string;
    Name : string;
    Surname : string;
}


//teacher entities
export type Teacher = {
    ID : string;
    Name : string;
    Surname : string;
}
