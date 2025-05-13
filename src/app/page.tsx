"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { me } from "@/api/account";

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await me();
        if (res.status === 200) {
          router.replace("/dashboard");
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        router.replace("/login");
      }
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Home;
