import NoticiaDetalhada from "@/app/_components/NoticiaDetalhada";

export default function Noticia2Page() {
  return (
    <NoticiaDetalhada
      titulo="Cardápio da semana atualizado!"
      imagem="/ticketruCardapio.png"
      conteudo={`O cardápio do restaurante universitário foi atualizado para esta semana. Agora, você tem mais opções para escolher durante o seu almoço, café da manhã e jantar.
                Fique por dentro e escolha suas refeições de forma fácil e prática diretamente no app.`}
      data="13 de maio de 2025"
    />
  );
}
