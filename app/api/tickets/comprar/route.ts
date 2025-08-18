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

    // tickets: array de objetos { tipo: "cafe" | "almoco", quantidade: number }
    const ticketsCriados = await Promise.all(
      tickets.map((ticket: { tipo: string; quantidade: number }) =>
        prisma.ticket.create({
          data: {
            tipo: ticket.tipo,
            quantidade: ticket.quantidade,
            userId: userId,
          },
        })
      )
    );

    return NextResponse.json({ success: true, tickets: ticketsCriados });
  } catch (error) {
    console.error("[ERRO_COMPRA]", error);
    return NextResponse.json(
      { success: false, error: "Erro ao processar compra" },
      { status: 500 }
    );
  }
}
