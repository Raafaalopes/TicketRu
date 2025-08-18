// app/api/tickets/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { jwtVerify } from "jose";

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || "segredo_dev";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(SECRET)
    );

    // Defina o tipo esperado do payload
    const { id } = payload as { id: string };

    const tickets = await prisma.ticket.findMany({
      where: {
        userId: id, // ou payload.id, depende do que você salvou
      },
    });

    return NextResponse.json({ tickets });
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar tickets" },
      { status: 500 }
    );
  }
}
