import NoticiaDetalhada from "@/app/_components/NoticiaDetalhada";

export default function Noticia2Page() {
  return (
    <NoticiaDetalhada
      titulo="Cardápio da semana atualizado!"
      imagem="/ticketruCardapio.png"
      conteudo={`O cardápio do restaurante universitário foi atualizado para esta semana. Agora, você pode verificar o que terá de almoço/janta de forma mais eficiente.
                Fique por dentro e escolha suas refeições de forma fácil e prática diretamente no app.`}
      data="13 de maio de 2025"
    />
  );
}
