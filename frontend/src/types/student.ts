import type {ApiResponse} from "./models";

export type RegisterCoursesRequest = {
  courses: string[];
};

export type RegisteredCourse = {
  ID: string;
  Name: string;
  Semester: number;
  Grade: number | null;
  TeacherName: string;
  TeacherSurname: string;
};

export type AvailableCourse = {
  ID: string;
  Name: string;
  Semester: number;
};

export type GetRegisteredCoursesResponse = ApiResponse & {
  courses: RegisteredCourse[];
};

export type GetAvailableCoursesResponse = ApiResponse & {
  courses: AvailableCourse[];
};