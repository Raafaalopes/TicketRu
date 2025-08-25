// app/api/tickets/comprar/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { jwtVerify } from "jose";

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || "segredo_dev";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(SECRET)
    );
    const userId = (payload as { id: string }).id;

    const body = await req.json();
    const { tickets } = body;
    // tickets: [{ tipo: "cafe", quantidade: 3 }, ...]

    const ticketsCriados: unknown[] = [];

    for (const ticket of tickets) {
      for (let i = 0; i < ticket.quantidade; i++) {
        const novo = await prisma.ticket.create({
          data: {
            tipo: ticket.tipo,
            quantidade: 1, // cada registro representa 1 ticket
            userId: userId,
          },
        });
        ticketsCriados.push(novo);
      }
    }

    return NextResponse.json({ success: true, tickets: ticketsCriados });
  } catch (error) {
    console.error("[ERRO_COMPRA]", error);
    return NextResponse.json(
      { success: false, error: "Erro ao processar compra" },
      { status: 500 }
    );
  }
}
