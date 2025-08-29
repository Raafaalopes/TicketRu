"use client";

import React, { useState } from "react";
import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Login() {
  const [nome, setNome] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [categoria, setCategoria] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      toast.error("As senhas não coincidem");
      return;
    }

    try {
      const res = await fetch("/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha, categoria }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erro ao cadastrar");

      toast.success("Cadastro realizado com sucesso!");
      router.push("/login");
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
          <h1 className=" text-3xl font-bold text-green-700">Cadastro</h1>
          <p className="mb-6 text-sm text-green-700">Crie sua conta</p>
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
          {/* NOME */}
          <div className="space-y-1 text-green-700">
            <Label htmlFor="name">Nome completo</Label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:border-none"
            />
          </div>

          {/* EMAIL */}
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
          {/* CONFIRMAR SENHA */}
          <div className="space-y-1 text-green-700">
            <Label htmlFor="confirm-password">Confirmar Senha</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="********"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
                className="pr-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:border-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-green-700 hover:text-green-900"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Cadastrar
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Já é um usuário?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
}
