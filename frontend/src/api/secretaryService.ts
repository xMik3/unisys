import {apiRequest} from "./apiClient";
import type {ApiResponse} from "../types/models";
import type {GetStudentsResponse,AddStudentResponse,AddStudentRequest,EditStudentRequest,GetCoursesResponse,AddCourseResponse,CourseRequest,GetTeachersResponse,AddTeacherResponse,AddTeacherRequest,EditTeacherRequest,} from "../types/secretary";

export const getStudents = (token: string, year: number) =>
  apiRequest<GetStudentsResponse>(`/students/year/${year}`, {method: "GET", token});

export const addStudent = (token: string, {name, surname, password, enrollmentYear}: AddStudentRequest) =>
  apiRequest<AddStudentResponse>("/students", {
    method: "PUT",
    token,
    body: {
      studentName: name,
      studentSurname: surname,
      studentPWD: password,
      studentEnrollmentYear: enrollmentYear,
    },
  });

export const editStudent = (token: string, studentID: string, {name, surname, password}: EditStudentRequest) =>
  apiRequest<ApiResponse>(`/students/${studentID}`, {
    method: "PATCH",
    token,
    body: {studentName: name, studentSurname: surname, studentPWD: password},
  });

export const deleteStudent = (token: string, studentID: string) =>
  apiRequest<ApiResponse>(`/students/${studentID}`, {method: "DELETE", token});

export const getCourses = (token: string) =>
  apiRequest<GetCoursesResponse>("/courses", {method: "GET", token});

export const addCourse = (token: string, {name, semester, teacherID}: CourseRequest) =>
  apiRequest<AddCourseResponse>("/courses", {
    method: "PUT",
    token,
    body: {courseName: name, courseSemester: semester, teacherID},
  });

export const editCourse = (token: string, courseID: string, {name, semester, teacherID}: CourseRequest) =>
  apiRequest<ApiResponse>(`/courses/${courseID}`, {
    method: "PATCH",
    token,
    body: {courseName: name, courseSemester: semester, teacherID},
  });

export const deleteCourse = (token: string, courseID: string) =>
  apiRequest<ApiResponse>(`/courses/${courseID}`, {method: "DELETE", token});

export const getTeachers = (token: string) =>
  apiRequest<GetTeachersResponse>("/teachers", {method: "GET", token});

export const addTeacher = (token: string, {name, surname, password}: AddTeacherRequest) =>
  apiRequest<AddTeacherResponse>("/teachers", {
    method: "PUT",
    token,
    body: {teacherName: name, teacherSurname: surname, teacherPWD: password},
  });

export const editTeacher = (token: string, teacherID: string, {name, surname, password}: EditTeacherRequest) =>
  apiRequest<ApiResponse>(`/teachers/${teacherID}`, {
    method: "PATCH",
    token,
    body: {teacherName: name, teacherSurname: surname, teacherPWD: password},
  });

export const deleteTeacher = (token: string, teacherID: string) =>
  apiRequest<ApiResponse>(`/teachers/${teacherID}`, {method: "DELETE", token});
