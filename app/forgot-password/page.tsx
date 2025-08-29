// app/forgot-password/page.tsx
"use client";

import React, { JSX, useState } from "react";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Label } from "@/app/_components/ui/label";
import { ChevronLeft } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus(
          "Se o email existir, você receberá o link para redefinir a senha."
        );
      } else {
        setStatus(data.error || "Erro ao solicitar redefinição.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Erro de rede.");
    } finally {
      setLoading(false);
    }
  };

  const NavLink = ({ href, icon }: { href: string; icon: JSX.Element }) => (
    <a href={href} className="flex items-center space-x-2">
      {icon}
    </a>
  );

  return (
    <>
      <nav className="absolute top-4 left-4">
        <NavLink href="/home" icon={<ChevronLeft size={20} />} />
      </nav>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-green-700">
            Esqueci minha senha
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Digite seu email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar link"}
            </Button>
          </form>
          {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
        </div>
      </div>
    </>
  );
}
