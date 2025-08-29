import NoticiaDetalhada from "@/app/_components/NoticiaDetalhada";

export default function Noticia3Page() {
  return (
    <NoticiaDetalhada
      titulo="Novas funcionalidades para o app!"
      imagem="/ticketruFuncionalidades.png"
      conteudo={`O TicketRu agora oferece mais funcionalidades para facilitar sua experiência. Entre as novidades, destacamos a compra mais rápida de tickets, a visualização do cardápio e a opção de pagamento por PIX.
                Tudo para tornar sua experiência mais simples e eficiente.`}
      data="12 de maio de 2025"
    />
  );
}
