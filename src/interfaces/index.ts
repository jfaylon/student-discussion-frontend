export interface CourseSummary {
  course_id: number;
  course_code: string;
  course_name: string;
  topic_count: number;
  student_count: number;
  entry_count: number;
}

export interface DashboardData {
  users: Record<string, number>;
  enrollments: {
    student_active?: number;
  };
  courses: {
    course_id: number;
    course_name: string;
    [key: string]: unknown;
  }[];
}

export interface User {
  user_login_id: string;
  role: string;
}

export interface UserContextType {
  user: User | null;
  loading: boolean;
}

export interface CourseData {
  course_id: number;
  semester: string;
  course_code: string;
  course_name: string;
  student_count: number;
  topics: {
    topic_id: number;
    topic_title: string;
    entry_count: number;
  }[];
  wordFrequency: Record<string, number>;
}

export interface Word {
  text: string;
  value: number;
}

export interface PieChartProps {
  title?: string;
  data: { [key: string]: number | undefined };
}

export interface LoginPayload {
  username: string;
  password: string;
}
