import {apiRequest} from "./apiClient";
import type {ApiResponse} from "../types/models";
import type {GradeStudentRequest, GetManagedCoursesResponse, GetManagedStudentsResponse} from "../types/teacher";

export const getManagedCourses = (token: string) =>
  apiRequest<GetManagedCoursesResponse>("/managedCourses", {method: "GET", token});

export const getManagedStudents = (token: string, courseID: string) =>
  apiRequest<GetManagedStudentsResponse>(`/managedCourses/${courseID}/students`, {method: "GET", token});

export const gradeStudent = (token: string, courseID: string, studentID: string, grade: number) => {
  const body: GradeStudentRequest = {grade};
  return apiRequest<ApiResponse>(`/managedCourses/${courseID}/students/${studentID}`, {
    method: "PATCH",
    token,
    body,
  });
};
