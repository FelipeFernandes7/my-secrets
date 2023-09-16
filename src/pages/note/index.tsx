import { FormEvent, useState } from "react";
import { Container } from "../../components/container";
import {
  BtnContainer,
  Button,
  Form,
  FormContent,
  NoteContainer,
  Section,
  Title,
} from "./styles";
import { Link } from "react-router-dom";
import { noteLinks } from "../../constants/note";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../services";
import toast from "react-hot-toast";

export function Note() {
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");
  const [feeling, setFeeling] = useState({
    happy: false,
    sad: false,
    excited: false,
  });
  async function handleAddNewNote(e: FormEvent) {
    e.preventDefault();
    try {
      await addDoc(collection(db, "notes"), {
        title: title,
        feeling: {
          sad: feeling.sad,
          happy: feeling.happy,
          excited: feeling.excited,
        },
        note: note,
        created: new Date(),
      });
      setNote("");
      setTitle("");
      setFeeling({
        excited: false,
        happy: false,
        sad: false,
      });
      toast.success("Nota adicionada com sucesso!", {
        position: "top-center",
        style: {
          background: "#232323",
          color: "#fff",
        },
      });
    } catch (error) {
      console.log(error, "error");
      toast.error("Erro ao adicionar nota!", {
        position: "top-center",
        style: {
          background: "#232323",
          color: "#fff",
        },
      });
    }
  }

  return (
    <NoteContainer>
      <Title>
        <h1>Como foi seu dia hoje?</h1>
      </Title>
      <Container>
        <Form onSubmit={handleAddNewNote}>
          <p>Faça do seu dia uma história!</p>
          <FormContent>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título"
            />
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Registre sua nota..."
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
            <p>Acesse meu GitHub ⬇ </p>
            <Link to={noteLinks.url} target="_blank">
              deixe uma estrela :) ⭐!
            </Link>
          </Section>
          <Button type="submit">Enviar</Button>
        </Form>
      </Container>
    </NoteContainer>
  );
}
