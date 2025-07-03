// app/components/NoticiaCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";

interface NoticiaCardProps {
  titulo: string;
  imagem: string;
  descricao: string;
  link: string;
  data: string;
}

export default function NoticiaCard({
  titulo,
  imagem,
  descricao,
  link,
  data,
}: NoticiaCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 shadow-lg">
      <Image
        src={imagem}
        alt={titulo}
        width={600}
        height={400}
        className="rounded-t-lg w-full"
      />
      <div className="p-4">
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <Calendar size={16} className="mr-1" />
          <span>{data}</span>
        </div>
        <h3 className="text-lg font-bold text-green-700">{titulo}</h3>
        <p className="text-gray-600 text-sm mt-1">{descricao}</p>
        <Link href={link}>
          <span className="text-green-500 mt-2 inline-block cursor-pointer text-sm">
            Saiba mais
          </span>
        </Link>
      </div>
    </div>
  );
}
