"use client";

import NoticiaCard from "../_components/NoticiaCard";
import Sidebar from "../_components/Sidebar";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-gray-100">
      <Sidebar pageTitle="Notícias" />

      {/* Conteúdo principal */}
      <main className="pt-4 p-4 md:ml-64">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <NoticiaCard
            titulo="TicketRu agora aceita PIX!"
            imagem="/ticketruPix.png"
            descricao="Agora, você pode usar o PIX para comprar seus tickets no TicketRu."
            link="/noticias/noticia-1"
            data="14 de maio de 2025"
          />
          <NoticiaCard
            titulo="Cardápio da semana atualizado!"
            imagem="/ticketruCardapio.png"
            descricao="Confira as opções de refeição para esta semana no TicketRu!"
            link="/noticias/noticia-2"
            data="13 de maio de 2025"
          />
          <NoticiaCard
            titulo="Novas funcionalidades para o app!"
            imagem="/ticketruFuncionalidades.png"
            descricao="O TicketRu agora tem mais funcionalidades para melhorar sua experiência."
            link="/noticias/noticia-3"
            data="12 de maio de 2025"
          />
        </div>
      </main>
    </div>
  );
}
