import api from "./axios";

export const getDashboardData = async () => {
  const res = await api.get(`api/dashboard`, { withCredentials: true });
  return res;
};

export const getDashboardCourseData = async (courseId: string) => {
  const res = await api.get(`api/dashboard/courses/${courseId}`, {
    withCredentials: true,
  });
  return res;
};

export const getSemesters = async () => {
  const res = await api.get(`api/dashboard/semesters`, {
    withCredentials: true,
  });
  return res;
};

export const getSemester = async (semester: string) => {
  const res = await api.get(`api/dashboard/semesters/${semester}`, {
    withCredentials: true,
  });
  return res;
};
