"use client";

import { useEffect, useState } from "react";
import Sidebar from "../_components/Sidebar";
import { QRCodeSVG } from "qrcode.react";

interface Ticket {
  id: string;
  tipo: "cafe" | "almoco";
  quantidade: number;
}

export default function TicketsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [nomeUsuario, setNomeUsuario] = useState("Usuário");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const data = new Date().toLocaleString("pt-BR");

  // Buscar tickets do usuário
  const fetchTickets = async () => {
    try {
      const res = await fetch("/api/tickets/me");
      const data = await res.json();

      if (res.ok) {
        setTickets(data.tickets);
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error("Erro ao buscar tickets:", err);
    }
  };

  useEffect(() => {
    fetchTickets();

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

    fetchUsuario();
  }, []);

  const handleGerarTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTicket(null);
  };

  const validarTicket = async () => {
    if (!selectedTicket) return;

    try {
      const res = await fetch(`/api/tickets/me?id=${selectedTicket.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTickets((prev) => prev.filter((t) => t.id !== selectedTicket.id));
        closeModal();
      } else {
        const err = await res.json();
        console.error(err.error);
      }
    } catch (err) {
      console.error("Erro ao validar ticket:", err);
    }
  };

  const ticketInfo = selectedTicket
    ? `Ticket: ${selectedTicket.tipo.toUpperCase()}\nNome: ${nomeUsuario}\nData: ${data}`
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
            <span className="font-semibold">
              {tickets.filter((t) => t.tipo === "cafe").length}
            </span>
          </p>
          <button
            onClick={() =>
              handleGerarTicket(tickets.find((t) => t.tipo === "cafe")!)
            }
            disabled={!tickets.some((t) => t.tipo === "cafe")}
            className={`px-4 py-2 rounded text-white text-sm font-medium ${
              !tickets.some((t) => t.tipo === "cafe")
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
            <span className="font-semibold">
              {tickets.filter((t) => t.tipo === "almoco").length}
            </span>
          </p>
          <button
            onClick={() =>
              handleGerarTicket(tickets.find((t) => t.tipo === "almoco")!)
            }
            disabled={!tickets.some((t) => t.tipo === "almoco")}
            className={`px-4 py-2 rounded text-white text-sm font-medium ${
              !tickets.some((t) => t.tipo === "almoco")
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
              <div className="flex justify-center gap-48 mt-4">
                <button
                  onClick={validarTicket}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                >
                  Validado
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
