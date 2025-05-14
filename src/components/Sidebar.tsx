"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, LayoutDashboard } from "lucide-react";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { logout } from "@/api/auth";
import { UI_STRINGS } from "@/constants";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <>
      <button
        className="md:hidden p-4 fixed top-4 left-4 z-50 bg-white shadow rounded"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        <Menu />
      </button>

      <aside
        className={`
        h-screen w-64 bg-white shadow overflow-y-auto
        transform transition-transform duration-300 ease-in-out

        fixed top-0 left-0 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"}

        md:static md:translate-x-0 md:sticky md:top-0
      `}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6">
            {UI_STRINGS.title.lmsInsightsPanel}
          </h2>
          <nav className="flex flex-col gap-4">
            <div className="text-md text-gray-600 mb-4">
              <p>{`${UI_STRINGS.text.welcome} ${user?.user_name}!`}</p>
              <p>{`${UI_STRINGS.text.role}: ${user?.role}`}</p>
            </div>
            <Link
              href="/dashboard"
              className="flex items-center text-blue-600 hover:underline gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              {UI_STRINGS.navBar.dashboard}
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline mt-4 cursor-pointer"
            >
              {UI_STRINGS.buttons.logout}
            </button>
          </nav>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-25 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
