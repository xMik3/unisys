import {apiRequest} from "./apiClient";
import type {ApiResponse} from "../types/models";
import type {
  RegisterCoursesRequest,
  GetRegisteredCoursesResponse,
  GetAvailableCoursesResponse,
} from "../types/student";

export const getRegisteredCourses = (token: string) =>
  apiRequest<GetRegisteredCoursesResponse>("/registeredCourses", {method: "GET", token});

export const getAvailableCourses = (token: string) =>
  apiRequest<GetAvailableCoursesResponse>("/availableCourses", {method: "GET", token});

export const registerCourses = (token: string, courseIDs: string[]) => {
  const body: RegisterCoursesRequest = {courses: courseIDs};
  return apiRequest<ApiResponse>("/registeredCourses", {method: "PUT", token, body});
};

export const unregisterCourse = (token: string, courseID: string) =>
  apiRequest<ApiResponse>(`/registeredCourses/${courseID}`, {method: "DELETE", token});
