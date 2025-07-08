"use client";

import { JSX, useState } from "react";
import Image from "next/image";
import {
  Menu,
  Ticket,
  Utensils,
  ShoppingCart,
  LogOut,
  House,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "../_context/UserContext";

interface SidebarProps {
  pageTitle: string;
}

export default function Sidebar({ pageTitle }: SidebarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { usuario } = useUser();

  const isActive = (route: string) => pathname === route;

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  const NavLink = ({
    href,
    icon,
    label,
  }: {
    href: string;
    icon: JSX.Element;
    label: string;
  }) => (
    <a
      href={href}
      onClick={() => setMenuOpen(false)}
      className={`flex items-center gap-2 hover:font-bold ${
        isActive(href) ? "font-bold " : ""
      }`}
    >
      {icon} {label}
    </a>
  );

  return (
    <>
      {/* Drawer (mobile) */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className=" left-0 top-0 h-full w-64 text-white flex flex-col relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagem de fundo ocupando toda a sidebar */}
            <Image
              src="/fundo-sidebar2.png"
              alt="fundo da sidebar"
              fill
              className="object-cover"
              priority
            />

            {/* Camada escura para contraste */}
            <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />

            {/* Conteúdo da sidebar */}
            <div className="relative z-10 p-4 flex flex-col h-full">
              {/* Informações do usuário */}
              {usuario && (
                <div className="mb-6 text-center">
                  <div className="text-xl font-semibold">{usuario.nome}</div>
                  <div className="capitalize text-sm text-white">
                    {usuario.categoria.charAt(0).toUpperCase() +
                      usuario.categoria.slice(1).toLowerCase()}
                  </div>
                </div>
              )}

              <hr className="border-t border-gray-300 opacity-50 mb-4" />

              {/* Navegação */}
              <nav className="flex flex-col gap-4">
                <NavLink href="/home" icon={<House size={20} />} label="Home" />
                <NavLink
                  href="/tickets"
                  icon={<Ticket size={20} />}
                  label="Meus Tickets"
                />
                <NavLink
                  href="/cardapio"
                  icon={<Utensils size={20} />}
                  label="Cardápio"
                />
                <NavLink
                  href="/comprar"
                  icon={<ShoppingCart size={20} />}
                  label="Comprar"
                />
              </nav>

              {/* Botão sair */}
              <div className="mt-auto pt-6">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-white hover:font-bold"
                >
                  <LogOut size={20} /> Sair
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top bar no mobile */}
      <div className="md:hidden">
        <div className="relative flex items-center justify-center bg-gradient-to-b from-green-600 to-green-800 shadow p-3">
          <button
            onClick={() => setMenuOpen(true)}
            className="absolute left-3 text-white"
          >
            <Menu size={28} />
          </button>
          <h1 className="text-2xl font-bold text-white text-center">
            {pageTitle}
          </h1>
        </div>
      </div>
    </>
  );
}
