"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/api/auth";
import { UI_STRINGS } from "@/constants";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login({ username, password });
      if (res.status === 200) {
        router.push("/dashboard");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Invalid credentials or server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <h2 className="text-2xl mb-4 font-semibold text-center">
          {UI_STRINGS.title.lmsInsightsDashboardLogin}
        </h2>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700"
          id="username"
          type="text"
          placeholder="User ID"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-6 text-gray-700"
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 w-full rounded cursor-pointer"
        >
          {UI_STRINGS.buttons.login}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
