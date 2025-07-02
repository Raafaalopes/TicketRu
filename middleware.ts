import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = process.env.JWT_SECRET || "segredo_dev";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(SECRET);
    await jwtVerify(token, secret); // ✅ Verifica token com jose
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/home"],
};
