"use client";

import { useState } from "react";
import Sidebar from "../_components/Sidebar";
import { QRCodeSVG } from "qrcode.react";

export default function TicketsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<"cafe" | "almoco">();

  // Simulação de dados
  const nome = "Rafael Lopes";
  const data = new Date().toLocaleString("pt-BR");
  const [tickets, setTickets] = useState({
    cafe: 3,
    almoco: 5,
  });

  const handleGerarTicket = (tipo: "cafe" | "almoco") => {
    setSelectedTicket(tipo);
    setModalOpen(true);

    // Atualiza os tickets (descontando 1)
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
    ? `Ticket: ${selectedTicket.toUpperCase()}\nNome: ${nome}\nData: ${data}`
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
