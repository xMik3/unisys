export type UserType = "Student" | "Teacher" | "Secretary";

export type ApiResponse = {
  status: string;
  message: string;
};

export type ApiRequest = {
  method: string;
  token?: string;
  body?: unknown;
};

export type Student = {
  ID: string;
  Name: string;
  Surname: string;
  Semester: number;
  EnrollmentYear: number;
}

export type Teacher = {
  ID: string;
  Name: string;
  Surname: string;
}

export type Course = {
  ID: string;
  Name: string;
  Semester: number;
  TeacherID: string | null;
  TeacherName: string | null;
  TeacherSurname: string | null;
}