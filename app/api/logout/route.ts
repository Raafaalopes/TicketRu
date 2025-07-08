// app/api/logout/route.ts
import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
  const cookie = serialize("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0), // faz o cookie expirar imediatamente
  });

  const response = NextResponse.json({ message: "Logout feito com sucesso" });
  response.headers.set("Set-Cookie", cookie);

  return response;
}
