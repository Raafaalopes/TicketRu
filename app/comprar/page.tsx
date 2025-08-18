// app/comprar/page.tsx
"use client";

import { useState } from "react";
import Sidebar from "../_components/Sidebar";
import { useRouter } from "next/navigation";
import { useUser } from "../_context/UserContext";

export default function ComprarPage() {
  const [almocoQtd, setAlmocoQtd] = useState(0);
  const [cafeQtd, setCafeQtd] = useState(0);
  const router = useRouter();

  const { usuario } = useUser();

  const precoCafe = 3.0; // fixo para todos

  // Só o almoço tem preço diferente por categoria
  const getPrecoAlmoco = () => {
    if (!usuario) return 0;

    switch (usuario.categoria) {
      case "ESTUDANTE":
        return 5.0;
      case "SERVIDOR":
        return 10.0;
      case "VISITANTE":
        return 19.0;
      default:
        return 0;
    }
  };

  const precoAlmoco = getPrecoAlmoco();

  const subtotalAlmoco = almocoQtd * precoAlmoco;
  const subtotalCafe = cafeQtd * precoCafe;
  const total = subtotalAlmoco + subtotalCafe;

  const irParaResumo = async () => {
    if (!usuario) return;

    try {
      const res = await fetch("/api/tickets/comprar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: usuario.id,
          tickets: [
            { tipo: "cafe", quantidade: cafeQtd },
            { tipo: "almoco", quantidade: almocoQtd },
          ].filter((t) => t.quantidade > 0),
        }),
      });

      const data = await res.json();

      if (data.success) {
        // Envia os dados como query params para a tela de resumo
        const query = `?cafeQtd=${cafeQtd}&almocoQtd=${almocoQtd}`;
        router.push(`/resumo-compra${query}`);
      } else {
        alert("Erro ao finalizar a compra");
      }
    } catch (err) {
      console.error(err);
      alert("Erro inesperado");
    }
  };

  return (
    <div>
      <Sidebar pageTitle="Comprar Tickets" />
      <div className="min-h-screen p-4 pt-4 md:ml-64 max-w-md mx-auto">
        <div className="space-y-6">
          {/* Cartão de Café da Manhã */}
          <div className="bg-white shadow-md rounded-xl p-4 border-l-4 border-r-4 border-yellow-600">
            <h2 className="text-lg font-bold text-yellow-700 mb-1">
              Café da Manhã
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              R$ {precoCafe.toFixed(2).replace(".", ",")} cada
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCafeQtd(Math.max(0, cafeQtd - 1))}
                  className="w-8 h-8 text-yellow-700 border border-yellow-700 rounded-full flex items-center justify-center"
                >
                  –
                </button>
                <span className="text-base">{cafeQtd}</span>
                <button
                  onClick={() => setCafeQtd(cafeQtd + 1)}
                  className="w-8 h-8 text-white bg-yellow-700 rounded-full flex items-center justify-center"
                >
                  +
                </button>
              </div>
              <span className="text-sm font-medium text-gray-700">
                Subtotal: R$ {subtotalCafe.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>

          {/* Cartão de Almoço/Janta */}
          <div className="bg-white shadow-md rounded-xl p-4 border-l-4 border-r-4 border-green-600">
            <h2 className="text-lg font-bold text-green-700 mb-1">
              Almoço/Janta
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              R$ {precoAlmoco.toFixed(2).replace(".", ",")} cada
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAlmocoQtd(Math.max(0, almocoQtd - 1))}
                  className="w-8 h-8 text-green-700 border border-green-700 rounded-full flex items-center justify-center"
                >
                  –
                </button>
                <span className="text-base">{almocoQtd}</span>
                <button
                  onClick={() => setAlmocoQtd(almocoQtd + 1)}
                  className="w-8 h-8 text-white bg-green-700 rounded-full flex items-center justify-center"
                >
                  +
                </button>
              </div>
              <span className="text-sm font-medium text-gray-700">
                Subtotal: R$ {subtotalAlmoco.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>

          {/* Totais */}
          <div className="text-md text-green-700 font-bold">
            <p>Total: R$ {total.toFixed(2).replace(".", ",")}</p>
          </div>

          {/* Botão de Finalizar Compra */}
          <button
            className="w-full mt-2 bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            onClick={irParaResumo}
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}
