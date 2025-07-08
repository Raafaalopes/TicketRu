"use client";

import { useState } from "react";
import { Leaf, Drumstick } from "lucide-react";
import Sidebar from "../_components/Sidebar";

const acompanhamentosBase = ["Arroz/Feijão", "Salada", "Fruta"];

const cardapioPadrao = [
  {
    dia: "SEG",
    prato: "Estrogonofe de Frango",
    acompanhamentos: ["Batata Palha", ...acompanhamentosBase],
  },
  {
    dia: "TER",
    prato: "Bisteca Suína ao Molho Barbecue",
    acompanhamentos: ["Macarrão ao Sugo", ...acompanhamentosBase],
  },
  {
    dia: "QUA",
    prato: "Bife ao Molho Madeira",
    acompanhamentos: ["Batata Assada", ...acompanhamentosBase],
  },
  {
    dia: "QUI",
    prato: "Sobrecoxa Assada",
    acompanhamentos: ["Macarrão ao Alho e Óleo", ...acompanhamentosBase],
  },
  {
    dia: "SEX",
    prato: "Cubos Suínos Acebolado",
    acompanhamentos: ["Farofa Crocante de Soja", ...acompanhamentosBase],
  },
];

const cardapioVegetariano = [
  {
    dia: "SEG",
    prato: "Estrogonofe de PTS / PTS ao Sugo",
    acompanhamentos: ["Batata Palha", ...acompanhamentosBase],
  },
  {
    dia: "TER",
    prato: "Ovos",
    acompanhamentos: ["Macarrão com Milho e Ervilha", ...acompanhamentosBase],
  },
  {
    dia: "QUA",
    prato: "Lentilha ao Molho",
    acompanhamentos: ["Batata Assada", ...acompanhamentosBase],
  },
  {
    dia: "QUI",
    prato: "Falafel c/ Molho de Iogurte",
    acompanhamentos: ["Macarrão ao Alho e Óleo", ...acompanhamentosBase],
  },
  {
    dia: "SEX",
    prato: "Virado à Paulista",
    acompanhamentos: ["Farofa Crocante de Soja", ...acompanhamentosBase],
  },
];

export default function CardapioPage() {
  const [vegetariano, setVegetariano] = useState(false);
  const cardapio = vegetariano ? cardapioVegetariano : cardapioPadrao;

  return (
    <div>
      <Sidebar pageTitle="Cardápio" />
      <div className="min-h-screen p-4 pt-4 md:ml-64 max-w-md mx-auto">
        <div className="flex flex-col items-center justify-center mb-4">
          <p className="text-sm text-gray-600 mt-1">
            Válido de 17/03 a 21/03 — Segunda à sexta
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Das 11h às 13h e das 18h às 19h30
          </p>
        </div>

        {/* Toggle estilizado */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-white shadow-md rounded-full overflow-hidden">
            <button
              onClick={() => setVegetariano(false)}
              className={`flex items-center gap-1 px-4 py-2 text-sm font-medium ${
                !vegetariano ? "bg-green-600 text-white" : "text-gray-500"
              } transition-colors`}
            >
              <Drumstick size={16} /> Padrão
            </button>
            <button
              onClick={() => setVegetariano(true)}
              className={`flex items-center gap-1 px-4 py-2 text-sm font-medium ${
                vegetariano ? "bg-green-600 text-white" : "text-gray-500"
              } transition-colors`}
            >
              <Leaf size={16} /> Vegetariano
            </button>
          </div>
        </div>

        {/* Lista dos dias */}
        {cardapio.map((dia, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-4 mb-4 flex gap-4 items-start border-green-700 border-l-4 border-r-4"
          >
            <div className="h-full flex items-center">
              <div className="bg-green-700 text-white font-bold text-sm px-3 py-2 rounded-md min-w-[50px] text-center">
                {dia.dia}
              </div>
            </div>
            <div>
              <h3 className="text-green-700 font-semibold text-base">
                {dia.prato}
              </h3>
              <ul className="text-gray-700 text-sm list-disc list-inside mt-1">
                {dia.acompanhamentos.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        <p className="text-xs text-gray-500 text-center mt-6 italic">
          *O cardápio pode sofrer alterações sem aviso prévio
        </p>
      </div>
    </div>
  );
}
