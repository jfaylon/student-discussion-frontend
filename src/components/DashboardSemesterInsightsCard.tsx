"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Link from "next/link";
import { CourseSummary } from "@/interfaces";
import { getSemester, getSemesters } from "@/api/dashboard";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DashboardSemesterInsightsCard: React.FC = () => {
  const [semester, setSemester] = useState<string>("");
  const [semesters, setSemesters] = useState<string[]>([]);
  const [courses, setCourses] = useState<CourseSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadSemesters = async () => {
      const res = await getSemesters();
      setSemesters(res.data.semesters);
      setSemester(res.data.semesters[0]);
    };

    loadSemesters();
  }, []);

  useEffect(() => {
    if (!semester) return;

    const loadCourseData = async () => {
      setLoading(true);
      const res = await getSemester(semester);
      setCourses(res.data.courses);
      setLoading(false);
    };

    loadCourseData();
  }, [semester]);

  const chartData = {
    labels: courses.map((c) => `${c.course_code} ${c.course_name}`),
    datasets: [
      {
        label: "Students",
        data: courses.map((c) => c.student_count),
        backgroundColor: "#60A5FA",
      },
      {
        label: "Topics",
        data: courses.map((c) => c.topic_count),
        backgroundColor: "#34D399",
      },
      {
        label: "Entries",
        data: courses.map((c) => c.entry_count),
        backgroundColor: "#FBBF24",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded shadow w-full col-span-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Semester Insights</h2>
        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 text-sm"
        >
          {semesters.map((sem) => (
            <option key={sem} value={sem}>
              {sem}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Semester Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded shadow">
                <p className="text-gray-600">Total Courses</p>
                <p className="text-xl font-bold">{courses.length}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded shadow">
                <p className="text-gray-600">Total Students</p>
                <p className="text-xl font-bold">
                  {courses.reduce((sum, c) => sum + c.student_count, 0)}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded shadow">
                <p className="text-gray-600">Total Topics</p>
                <p className="text-xl font-bold">
                  {courses.reduce((sum, c) => sum + c.topic_count, 0)}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded shadow">
                <p className="text-gray-600">Average Topics / Course</p>
                <p className="text-xl font-bold">
                  {Math.fround(
                    courses.reduce((sum, c) => sum + c.topic_count, 0) /
                      courses.length
                  ).toFixed(2)}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded shadow">
                <p className="text-gray-600">Total Entries</p>
                <p className="text-xl font-bold">
                  {courses.reduce((sum, c) => sum + c.entry_count, 0)}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded shadow">
                <p className="text-gray-600">Average Entries / Course</p>
                <p className="text-xl font-bold">
                  {courses.length > 0
                    ? Math.fround(
                        courses.reduce((sum, c) => sum + c.entry_count, 0) /
                          courses.length
                      ).toFixed(2)
                    : 0}
                </p>
              </div>
            </div>
          </div>
          <br />
          <div className="overflow-x-auto mb-6">
            <table className="w-full table-auto border text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="border p-2">Course Code</th>
                  <th className="border p-2">Course Name</th>
                  <th className="border p-2">Students</th>
                  <th className="border p-2">Topics</th>
                  <th className="border p-2">Entries</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.course_id} className="hover:bg-gray-50">
                    <td className="p-2 border">
                      <Link
                        href={`/dashboard/${course.course_id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {course.course_code}
                      </Link>
                    </td>
                    <td className="p-2 border">
                      <Link
                        href={`/dashboard/${course.course_id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {course.course_name}
                      </Link>
                    </td>
                    <td className="border p-2">{course.student_count}</td>
                    <td className="border p-2">{course.topic_count}</td>
                    <td className="border p-2">{course.entry_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="w-full">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardSemesterInsightsCard;
