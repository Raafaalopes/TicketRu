// app/resumo-compra/page.tsx
"use client";

import { useUser } from "@/app/_context/UserContext";
import { ChevronLeft } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import { toast } from "sonner";

const precos = {
  ESTUDANTE: {
    cafe: 3.0,
    almoco: 5.0,
  },
  SERVIDOR: {
    cafe: 3.0,
    almoco: 10.0,
  },
  VISITANTE: {
    cafe: 3.0,
    almoco: 19.0,
  },
};

export default function ResumoCompra() {
  const { usuario } = useUser();
  const [formaPagamento, setFormaPagamento] = useState("credito");
  const [cafeQtd, setCafeQtd] = useState(0);
  const [almocoQtd, setAlmocoQtd] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const cafe = Number(searchParams.get("cafeQtd") || 0);
    const almoco = Number(searchParams.get("almocoQtd") || 0);
    setCafeQtd(cafe);
    setAlmocoQtd(almoco);
  }, [searchParams]);

  if (!usuario) return null; // ou <p>Carregando...</p>

  const categoria = usuario.categoria.toUpperCase() as keyof typeof precos;
  const precoCafe = precos[categoria]?.cafe ?? 3.0;
  const precoAlmoco = precos[categoria]?.almoco ?? 10.0;
  const total = cafeQtd * precoCafe + almocoQtd * precoAlmoco;

  const finalizar = () => {
    toast.success(
      `Pagamento simulado com ${formaPagamento.toUpperCase()}.\nCompra finalizada!`
    );
    router.push("/comprar"); // redireciona para a tela de compra
  };

  const NavLink = ({ href, icon }: { href: string; icon: JSX.Element }) => (
    <a href={href} className="flex items-center space-x-2">
      {icon}
    </a>
  );

  return (
    <>
      <nav className="absolute top-4 left-4 text-green-700">
        <NavLink href="/comprar" icon={<ChevronLeft size={25} />} />
      </nav>

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full p-6 bg-white shadow-md rounded-xl space-y-6 border-l-4 border-r-4 border-green-600">
          <h2 className="text-2xl font-bold text-center">Resumo da Compra</h2>

          {cafeQtd > 0 && (
            <div className="flex justify-between">
              <span>Café da manhã (x{cafeQtd})</span>
              <span>R$ {(cafeQtd * precoCafe).toFixed(2)}</span>
            </div>
          )}

          {almocoQtd > 0 && (
            <div className="flex justify-between">
              <span>Almoço/Jantar (x{almocoQtd})</span>
              <span>R$ {(almocoQtd * precoAlmoco).toFixed(2)}</span>
            </div>
          )}

          <div className="border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>

          <div className="mt-4">
            <label className="block font-medium mb-2">
              Forma de pagamento:
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="pagamento"
                  value="credito"
                  checked={formaPagamento === "credito"}
                  onChange={() => setFormaPagamento("credito")}
                  className="mr-2"
                />
                Cartão de Crédito
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="pagamento"
                  value="debito"
                  checked={formaPagamento === "debito"}
                  onChange={() => setFormaPagamento("debito")}
                  className="mr-2"
                />
                Cartão de Débito
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="pagamento"
                  value="pix"
                  checked={formaPagamento === "pix"}
                  onChange={() => setFormaPagamento("pix")}
                  className="mr-2"
                />
                Pix
              </label>
            </div>
          </div>

          <button
            onClick={finalizar}
            className="w-full mt-4 bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
          >
            Finalizar Pagamento
          </button>
        </div>
      </div>
    </>
  );
}
