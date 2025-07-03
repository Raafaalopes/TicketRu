"use client";

import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface NoticiaDetalhadaProps {
  titulo: string;
  imagem: string;
  conteudo: string;
  data: string;
}

export default function NoticiaDetalhada({
  titulo,
  imagem,
  conteudo,
  data,
}: NoticiaDetalhadaProps) {
  return (
    <div className="p-4 md:ml-64 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-green-700 text-center mb-4">
        {titulo}
      </h1>
      {/* data da noticia */}
      <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
        <Calendar className="w-4 h-4 mr-1" />
        <span>{data}</span>
      </div>

      <div className="relative w-full h-64 mb-4">
        <Image
          src={imagem}
          alt={titulo}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <p className="text-gray-800 whitespace-pre-line mb-6">{conteudo}</p>

      <div className="text-center">
        <Link
          href="/home"
          className="inline-block px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
        >
          Voltar para as notícias
        </Link>
      </div>
    </div>
  );
}
