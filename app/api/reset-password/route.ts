// app/api/usuarios/reset-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { token, senha } = await req.json();

    if (!token || !senha) {
      return NextResponse.json(
        { error: "Token e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const now = new Date();

    const user = await prisma.usuario.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gt: now },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Token inválido ou expirado" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(senha, 10);

    await prisma.usuario.update({
      where: { id: user.id },
      data: {
        senha: hashed,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return NextResponse.json({ message: "Senha redefinida com sucesso" });
  } catch (err) {
    console.error("ERRO reset-password:", err);
    return NextResponse.json(
      { error: "Erro ao redefinir senha" },
      { status: 500 }
    );
  }
}
