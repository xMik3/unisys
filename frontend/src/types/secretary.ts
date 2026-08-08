import type {ApiResponse, Student, Course, Teacher} from "./models";

export type AddStudentRequest = {
  name: string;
  surname: string;
  password: string;
  enrollmentYear: number;
};

export type EditStudentRequest = {
  name: string;
  surname: string;
  password: string;
};

export type CourseRequest = {
  name: string;
  semester: number;
  /** A teacher's ID, or the literal "NULL" sentinel the backend uses for "no teacher assigned". */
  teacherID: string;
};

export type AddTeacherRequest = {
  name: string;
  surname: string;
  password: string;
};

export type EditTeacherRequest = AddTeacherRequest;

export type GetStudentsResponse = ApiResponse & {
  students: Student[];
};

export type GetCoursesResponse = ApiResponse & {
  courses: Course[];
};

export type GetTeachersResponse = ApiResponse & {
  teachers: Teacher[];
};

export type AddStudentResponse = ApiResponse & {
  studentID: string;
};

export type AddTeacherResponse = ApiResponse & {
  teacherID: string;
};

export type AddCourseResponse = ApiResponse & {
  courseID: string;
};