import NoticiaDetalhada from "@/app/_components/NoticiaDetalhada";

export default function Noticia1Page() {
  return (
    <NoticiaDetalhada
      titulo="TicketRu agora aceita PIX!"
      imagem="/ticketruPix.png"
      conteudo={`A partir de agora, você pode comprar seus tickets usando PIX diretamente pelo app TicketRu!
      

Essa novidade visa facilitar ainda mais o acesso ao restaurante universitário. Basta acessar a aba "Comprar", selecionar suas refeições e escolher o método PIX.

Tudo rápido, seguro e sem complicações.`}
      data="14 de maio de 2025"
    />
  );
}
