"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import DashboardCard from "@/components/DashboardCard";
import { CourseData } from "@/interfaces";
import { getDashboardCourseData } from "@/api/dashboard";
import { UI_STRINGS } from "@/constants";

const WordCloudCanvas = dynamic(() => import("@/components/WordCloudCanvas"), {
  ssr: false,
});

const CoursePage: React.FC = () => {
  const { courseId } = useParams();
  const [data, setData] = useState<CourseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboardCourseData(courseId as string);
        setData(res.data.course);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchData();
  }, [courseId]);

  if (!data)
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <p className="p-6">{error || UI_STRINGS.text.loadingCourseData}</p>
      </div>
    );

  const totalEntries = data.topics.reduce((sum, t) => sum + t.entry_count, 0);
  const wordList = Object.entries(data.wordFrequency).map(([text, value]) => ({
    text,
    value,
  }));

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="mb-6">
          <Link href="/dashboard">
            <button className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded hover:bg-blue-200 cursor-pointer">
              {UI_STRINGS.buttons.backToDashboard}
            </button>
          </Link>
        </div>

        <div>
          <h1 className="text-2xl font-bold">{data.course_name}</h1>
          <p className="text-gray-500">
            {`${data.course_code} • ${UI_STRINGS.text.semester}: ${data.semester}`}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <DashboardCard
            title={UI_STRINGS.text.enrolledStudents}
            value={data.student_count}
          />
          <DashboardCard
            title={UI_STRINGS.text.totalTopics}
            value={data.topics.length}
          />
          <DashboardCard
            title={UI_STRINGS.text.totalEntries}
            value={totalEntries}
          />
        </div>

        <div className="bg-white p-4 rounded shadow overflow-x-auto mb-6">
          <h2 className="text-lg font-semibold mb-2">
            {UI_STRINGS.text.topicsOverview}
          </h2>
          <table className="w-full text-sm table-auto border-collapse">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2 border">
                  {UI_STRINGS.tableHeaders.topicId}
                </th>
                <th className="p-2 border">{UI_STRINGS.tableHeaders.title}</th>
                <th className="p-2 border">
                  {UI_STRINGS.tableHeaders.entryCount}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.topics.map((topic) => (
                <tr key={topic.topic_id} className="hover:bg-gray-50">
                  <td className="p-2 border">{topic.topic_id}</td>
                  <td className="p-2 border">{topic.topic_title}</td>
                  <td className="p-2 border">{topic.entry_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <WordCloudCanvas words={wordList} />
        <div className="mt-6">
          <Link href="/dashboard">
            <button className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded hover:bg-blue-200 cursor-pointer">
              {UI_STRINGS.buttons.backToDashboard}
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default CoursePage;
