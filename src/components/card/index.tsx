import { format } from "date-fns";
import { CardContainer, Section, Title } from "./styles";
import { ptBR } from "date-fns/locale";

export function Card() {
  return (
    <CardContainer>
      <Section>
        <h1>{format(new Date(), "EEEE", { locale: ptBR })}</h1>
        <span>{format(new Date(), "p", { locale: ptBR })}h</span>
      </Section>
      <Title>
        <h1>Minha Primeira viagem ao beto carrero</h1>
      </Title>
    </CardContainer>
  );
}
