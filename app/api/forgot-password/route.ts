// app/api/usuarios/forgot-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import crypto from "crypto";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email é obrigatório" },
        { status: 400 }
      );
    }

    const user = await prisma.usuario.findUnique({ where: { email } });

    // sempre retornar mensagem genérica pra não vazar se o email existe
    const genericSuccess = {
      message:
        "Se o email existir, você receberá um link para redefinir a senha.",
    };

    if (!user) {
      // retorna sucesso para evitar enumeração de usuários
      return NextResponse.json(genericSuccess);
    }

    // gerar token e salvar
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpires = new Date(Date.now() + 1000 * 60 * 60); // 1 hora

    await prisma.usuario.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpiry: resetTokenExpires },
    });

    // montar link
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const resetLink = `${baseUrl}/reset-password?token=${resetToken}`;

    // configurar nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465, // true para 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const from = process.env.EMAIL_FROM || process.env.SMTP_USER;

    // enviar o email
    const mailOptions = {
      from,
      to: user.email,
      subject: "Redefinição de senha - TicketRu",
      text: `Você solicitou redefinir sua senha.\n\nAbra este link para redefinir: ${resetLink}\n\nSe você não pediu, ignore este email.`,
      html: `<p>Você solicitou redefinir sua senha.</p>
             <p><a href="${resetLink}">Clique aqui para redefinir sua senha</a></p>
             <p>Se você não pediu, ignore este email.</p>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(genericSuccess);
  } catch (err) {
    console.error("ERRO forgot-password:", err);
    return NextResponse.json(
      { error: "Erro ao processar solicitação" },
      { status: 500 }
    );
  }
}
