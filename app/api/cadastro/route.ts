import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { nome, email, senha, categoria } = await req.json();

  if (!nome || !email || !senha || !categoria) {
    return NextResponse.json({ error: "Campos obrigatórios" }, { status: 400 });
  }

  const usuarioExistente = await prisma.usuario.findUnique({
    where: { email },
  });

  if (usuarioExistente) {
    return NextResponse.json({ error: "Email já cadastrado" }, { status: 409 });
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  const novoUsuario = await prisma.usuario.create({
    data: { nome, email, senha: senhaHash, categoria },
  });

  return NextResponse.json({
    message: "Usuário cadastrado",
    usuario: novoUsuario,
  });
}
