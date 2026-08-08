import type {ApiResponse} from "./models";

export type GradeStudentRequest = {
  grade: number;
};

export type ManagedCourse = {
  ID: string;
  Name: string;
  Semester: number;
};

export type ManagedStudent = {
  ID: string;
  Name: string;
  Surname: string;
};

export type GetManagedCoursesResponse = ApiResponse & {
  courses: ManagedCourse[];
};

export type GetManagedStudentsResponse = ApiResponse & {
  students: ManagedStudent[];
};
