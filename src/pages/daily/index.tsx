import { useState } from "react";
import { Container } from "../../components/container";
import {
  BtnContainer,
  Button,
  DailyContainer,
  Form,
  FormContent,
  Section,
  Title,
} from "./styles";
import { Link } from "react-router-dom";
import { dailyLinks } from "../../constants/daily";

export function Daily() {
  const [daily, setDaily] = useState("");
  const [feeling, setFeeling] = useState({
    happy: false,
    sad: false,
    excited: false,
  });
  return (
    <DailyContainer>
      <Title>
        <h1>Como foi seu dia hoje?</h1>
      </Title>
      <Container>
        <Form>
          <p>Faça do seu dia uma história!</p>
          <FormContent>
            <textarea
              value={daily}
              onChange={(e) => setDaily(e.target.value)}
              placeholder="Registre aqui o seu dia :)"
            />
          </FormContent>
          <Section>
            <p>Sentimento?</p>
            <BtnContainer>
              <button
                onClick={() => setFeeling((t) => ({ ...t, happy: !t.happy }))}
                style={{
                  background: feeling.happy ? " rgb(37 99 235)" : "transparent",
                }}
                type="button"
              >
                Feliz
              </button>
              <button
                onClick={() => setFeeling((t) => ({ ...t, sad: !t.sad }))}
                style={{
                  background: feeling.sad ? " rgb(37 99 235)" : "transparent",
                }}
                type="button"
              >
                Triste
              </button>
              <button
                onClick={() =>
                  setFeeling((t) => ({ ...t, excited: !t.excited }))
                }
                style={{
                  background: feeling.excited
                    ? " rgb(37 99 235)"
                    : "transparent",
                }}
                type="button"
              >
                Extasiado
              </button>
            </BtnContainer>
          </Section>
          <Section>
            <p>Está se sentindo cansado?, acesse ⬇ </p>
            <Link to={dailyLinks.url} target="_blank">
             8 Dicas para reduzir o cansaço no final do dia!
            </Link>
          </Section>
          <Button type="button">Enviar</Button>
        </Form>
      </Container>
    </DailyContainer>
  );
}
