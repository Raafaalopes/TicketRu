// app/api/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@/app/generated/prisma";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || "segredo_dev";

export async function POST(req: Request) {
  const { email, senha, manterConectado, categoria } = await req.json();

  if (!email || !senha) {
    return NextResponse.json(
      { error: "Preencha todos os campos" },
      { status: 400 }
    );
  }

  const usuario = await prisma.usuario.findUnique({ where: { email } });

  if (!usuario) {
    return NextResponse.json(
      { error: "Email não cadastrado" },
      { status: 404 }
    );
  }

  if (usuario.categoria !== categoria) {
    return NextResponse.json(
      {
        error: "Categoria incorreta para este usuário",
      },
      { status: 401 }
    );
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      categoria: usuario.categoria,
    },
    SECRET,
    {
      expiresIn: manterConectado ? "7d" : "2h",
    }
  );

  const cookie = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // caso queira que o token seja destruido quando nao clicar em manter conectado
    //  é so tirar o que vem depois de :
    maxAge: manterConectado ? 60 * 60 * 24 * 7 : 60 * 60 * 2, // 7 dias ou 2 horas
  });

  const response = NextResponse.json({ message: "Login com sucesso" });
  response.headers.set("Set-Cookie", cookie);

  return response;
}
