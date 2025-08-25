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

    const { id } = payload as { id: string };

    const tickets = await prisma.ticket.findMany({
      where: {
        userId: id,
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

// DELETE para remover ticket
export async function DELETE(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(SECRET)
    );
    const { id: userId } = payload as { id: string };

    const { searchParams } = new URL(req.url);
    const ticketId = searchParams.get("id");

    if (!ticketId) {
      return NextResponse.json(
        { error: "ID do ticket não fornecido" },
        { status: 400 }
      );
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket || ticket.userId !== userId) {
      return NextResponse.json(
        { error: "Ticket não encontrado ou não pertence ao usuário" },
        { status: 404 }
      );
    }

    await prisma.ticket.delete({
      where: { id: ticketId },
    });

    return NextResponse.json({ message: "Ticket validado e removido" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao validar ticket" },
      { status: 500 }
    );
  }
}
