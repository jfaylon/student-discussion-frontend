"use client";

import Sidebar from "@/components/Sidebar";
import DashboardCard from "@/components/DashboardCard";
import { useEffect, useState } from "react";
import DashboardSemesterInsightsCard from "@/components/DashboardSemesterInsightsCard";
import { DashboardData } from "@/interfaces";
import { getDashboardData } from "@/api/dashboard";
import { UI_STRINGS } from "@/constants";

const DashboardPage: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDashboardData();
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-6">
          {UI_STRINGS.title.dashboard}
        </h1>

        {!data ? (
          <p>{UI_STRINGS.text.loading}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <DashboardCard
              title={UI_STRINGS.text.totalUsers}
              value={
                (Object.values(data.users) as number[]).reduce(
                  (sum, currentValue) =>
                    (sum as number) + (currentValue as number),
                  0
                ) || 0
              }
            />
            <DashboardCard
              title={UI_STRINGS.text.totalStudents}
              value={data.enrollments.student_active || 0}
            />
            <DashboardCard
              title={UI_STRINGS.text.totalCourses}
              value={data.courses?.length}
            />
            <DashboardSemesterInsightsCard />
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
