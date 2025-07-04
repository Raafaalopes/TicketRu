"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./loading.css";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 4000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="loading-container">
      <div className="circle">
        <div className="wave"></div>
      </div>
    </div>
  );
}
