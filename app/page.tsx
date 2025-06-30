"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url(/campus.jpg)" }}
    >
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center"
      >
        <motion.img
          src="/logo-admin.png"
          alt="Logo TicketRu Admin"
          className="h-20 w-20"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-3xl font-bold text-green-700"
        >
          TicketRu
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-green-600"
        >
          O restaurante na sua mão
        </motion.p>
      </motion.div>
    </div>
  );
}
