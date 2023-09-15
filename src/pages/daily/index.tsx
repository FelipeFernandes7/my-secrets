import { useState } from "react";
import { Container } from "../../components/container";
import {
  BtnContainer,
  DailyContainer,
  Form,
  FormContent,
  Section,
  Title,
} from "./styles";

export function Daily() {
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
            <textarea placeholder="Registre aqui o seu dia :)" />
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
        </Form>
      </Container>
    </DailyContainer>
  );
}
