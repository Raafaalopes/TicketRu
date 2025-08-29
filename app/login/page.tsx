"use client";

import React, { useState } from "react";
import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [categoria, setCategoria] = useState("");
  const [manterConectado, setManterConectado] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha, manterConectado, categoria }),
        credentials: "include", // para enviar cookies
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erro ao fazer login");

      toast.success("Login realizado com sucesso!");
      console.log("redirecionando para o home");
      router.push("/home"); // ou dashboard
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Ocorreu um erro desconhecido.");
      }
    }
  };
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url(/campus.jpg)" }}
    >
      {/* imagem mais escura ao fundo */}
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg border-l-4 border-r-4 border-green-600 relative z-10">
        <div className="flex flex-col text-center gap-1">
          <h1 className=" text-3xl font-bold text-green-700">Login</h1>
          <p className="mb-6 text-sm text-green-700">Seja bem vindo</p>
        </div>
        <form className="space-y-4 text-green-700" onSubmit={handleSubmit}>
          <Label htmlFor="userType">Tipo de usuário</Label>
          <select
            name="userType"
            id="userType"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full  rounded-md border bg-white  px-3 py-2 text-sm text-green-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            required
          >
            <option value="" disabled>
              Selecione
            </option>
            <option value="ESTUDANTE">Estudante</option>
            <option value="SERVIDOR">Servidor</option>
            <option value="VISITANTE">Visitante</option>
          </select>
          <div className="space-y-1 text-green-700">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:border-none"
            />
          </div>
          {/* SENHA */}
          <div className="space-y-1 text-green-700">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="pr-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:border-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-green-700 hover:text-green-900"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          {/* MANTER CONECTADO */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="manter-conectado"
              checked={manterConectado}
              onChange={(e) => setManterConectado(e.target.checked)}
              className="accent-green-700"
            />
            <Label
              htmlFor="manter-conectado"
              className="text-green-700 text-sm"
            >
              Manter-me conectado
            </Label>
          </div>
          {/* link esqueci minha senha */}
          <div className="text-right text-sm">
            <a
              href="/forgot-password"
              className="text-green-700 hover:underline"
            >
              Esqueci minha senha
            </a>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Entrar
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Ainda não tem conta?{" "}
          <a href="/cadastro" className="text-green-600 hover:underline">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
}
