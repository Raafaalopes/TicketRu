"use client";

import { useEffect, useState } from "react";
import Sidebar from "../_components/Sidebar";
import { QRCodeSVG } from "qrcode.react";

interface Ticket {
  tipo: "cafe" | "almoco";
  quantidade: number;
}

export default function TicketsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<"cafe" | "almoco">();
  const [nomeUsuario, setNomeUsuario] = useState("Usuário");
  const [tickets, setTickets] = useState({ cafe: 0, almoco: 0 });
  const data = new Date().toLocaleString("pt-BR");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch("/api/tickets/me");
        const data = await res.json();

        if (res.ok) {
          const cafeQtd = (data.tickets as Ticket[])
            .filter((t) => t.tipo === "cafe")
            .reduce((acc, t) => acc + t.quantidade, 0);

          const almocoQtd = (data.tickets as Ticket[])
            .filter((t) => t.tipo === "almoco")
            .reduce((acc, t) => acc + t.quantidade, 0);

          setTickets({ cafe: cafeQtd, almoco: almocoQtd });
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error("Erro ao buscar tickets:", err);
      }
    };

    const fetchUsuario = async () => {
      try {
        const res = await fetch("/api/me");
        const data = await res.json();

        if (res.ok) {
          setNomeUsuario(data.nome);
        }
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
      }
    };

    fetchTickets();
    fetchUsuario();
  }, []);

  const handleGerarTicket = (tipo: "cafe" | "almoco") => {
    setSelectedTicket(tipo);
    setModalOpen(true);

    // Apenas visual (não altera o backend)
    setTickets((prev) => ({
      ...prev,
      [tipo]: Math.max(prev[tipo] - 1, 0),
    }));
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTicket(undefined);
  };

  const ticketInfo = selectedTicket
    ? `Ticket: ${selectedTicket.toUpperCase()}\nNome: ${nomeUsuario}\nData: ${data}`
    : "";

  return (
    <div>
      <Sidebar pageTitle="Meus Tickets" />
      <div className="min-h-screen p-4 pt-4 md:ml-64 md:pt-6 max-w-md mx-auto">
        {/* Bloco: Café da Manhã */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 border-l-4 border-r-4 border-yellow-500">
          <h2 className="text-lg font-bold text-yellow-700 mb-2">
            Café da Manhã
          </h2>
          <p className="text-gray-800 text-sm mb-2">
            Tickets disponíveis:{" "}
            <span className="font-semibold">{tickets.cafe}</span>
          </p>
          <button
            onClick={() => handleGerarTicket("cafe")}
            disabled={tickets.cafe === 0}
            className={`px-4 py-2 rounded text-white text-sm font-medium ${
              tickets.cafe === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-600 hover:bg-yellow-700"
            }`}
          >
            Gerar Ticket
          </button>
        </div>

        {/* Bloco: Almoço / Jantar */}
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-r-4 border-green-600">
          <h2 className="text-lg font-bold text-green-700 mb-2">
            Almoço / Jantar
          </h2>
          <p className="text-gray-800 text-sm mb-2">
            Tickets disponíveis:{" "}
            <span className="font-semibold">{tickets.almoco}</span>
          </p>
          <button
            onClick={() => handleGerarTicket("almoco")}
            disabled={tickets.almoco === 0}
            className={`px-4 py-2 rounded text-white text-sm font-medium ${
              tickets.almoco === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Gerar Ticket
          </button>
        </div>

        {/* Modal com QR Code */}
        {modalOpen && selectedTicket && (
          <div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold mb-4 text-green-700">
                Ticket Gerado
              </h3>
              <div className="flex justify-center items-center mt-4 mb-2">
                <QRCodeSVG value={ticketInfo} size={200} />
              </div>
              <p className="text-xs text-gray-500 mt-4 whitespace-pre-line">
                {ticketInfo}
              </p>
              <button
                onClick={closeModal}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
