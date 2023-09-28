import { FormEvent, useContext, useState } from "react";
import {
  BtnContainer,
  Button,
  Form,
  FormContent,
  NoteContainer,
  Section,
  Title,
} from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { noteLinks } from "../../constants/note";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../services";
import toast from "react-hot-toast";
import { Feeling } from "../../components/feeling";
import { NoteContext } from "../../context/NoteContext";
import { useAuth } from "../../hooks";

export function Note() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");
  const [feeling, setFeeling] = useState({
    happy: false,
    sad: false,
    anxious: false,
    insecure: false,
    excited: false,
    afraid: false,
    disciplined: false,
    focused: false,
    unshakable: false,
  });
  const { fetchDocs } = useContext(NoteContext);

  async function handleAddNewNote(e: FormEvent) {
    e.preventDefault();
    try {
      await addDoc(collection(db, "notes"), {
        title: title,
        feeling: {
          happy: feeling.happy,
          sad: feeling.sad,
          anxious: feeling.anxious,
          insecure: feeling.insecure,
          excited: feeling.excited,
          afraid: feeling.afraid,
          disciplined: feeling.disciplined,
          focused: feeling.focused,
          unshakable: feeling.unshakable,
        },
        note: note,
        userId: user?.uid,
        created: new Date(),
      });
      setNote("");
      setTitle("");
      setFeeling({
        excited: false,
        happy: false,
        sad: false,
        afraid: false,
        anxious: false,
        disciplined: false,
        focused: false,
        insecure: false,
        unshakable: false,
      });
      toast.success("Nota adicionada com sucesso!", {
        position: "top-center",
        style: {
          background: "#232323",
          color: "#fff",
        },
      });
      await fetchDocs();
      navigate("/");
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
      <Form onSubmit={handleAddNewNote}>
        <p>Faça uma anotação!</p>
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
            <Feeling
              isFeelingEnabled={feeling.happy}
              background="rgb(74 222 128)"
              description="Feliz"
              feelingState={() =>
                setFeeling((f) => ({ ...f, happy: !f.happy }))
              }
            />
            <Feeling
              isFeelingEnabled={feeling.sad}
              background="rgb(220 38 38)"
              description="Triste"
              feelingState={() => setFeeling((f) => ({ ...f, sad: !f.sad }))}
            />
            <Feeling
              isFeelingEnabled={feeling.excited}
              background="rgb(34 197 94)"
              description="Alegre"
              feelingState={() =>
                setFeeling((f) => ({ ...f, excited: !f.excited }))
              }
            />
            <Feeling
              isFeelingEnabled={feeling.disciplined}
              background=" rgb(37 99 235)"
              description="Disciplinado"
              feelingState={() =>
                setFeeling((f) => ({ ...f, disciplined: !f.disciplined }))
              }
            />
            <Feeling
              isFeelingEnabled={feeling.anxious}
              background=" rgb(253 224 71)"
              description="Ansioso"
              feelingState={() =>
                setFeeling((f) => ({ ...f, anxious: !f.anxious }))
              }
            />
            <Feeling
              isFeelingEnabled={feeling.focused}
              background=" rgb(79 70 229)"
              description="Focado"
              feelingState={() =>
                setFeeling((f) => ({ ...f, focused: !f.focused }))
              }
            />
            <Feeling
              isFeelingEnabled={feeling.insecure}
              background=" rgb(245 158 11)"
              description="Inseguro"
              feelingState={() =>
                setFeeling((f) => ({ ...f, insecure: !f.insecure }))
              }
            />
            <Feeling
              isFeelingEnabled={feeling.unshakable}
              background=" rgb(219 39 119)"
              description="Inabalável"
              feelingState={() =>
                setFeeling((f) => ({ ...f, unshakable: !f.unshakable }))
              }
            />
            <Feeling
              isFeelingEnabled={feeling.afraid}
              background=" rgb(254 215 170)"
              description="Medo"
              feelingState={() =>
                setFeeling((f) => ({ ...f, afraid: !f.afraid }))
              }
            />
          </BtnContainer>
        </Section>
        <Section>
          <p>Acesse meu GitHub ⬇ </p>
          <Link to={noteLinks.url} target="_blank">
            deixe uma estrela :) ⭐!
          </Link>
        </Section>
        <Button disabled={!note || !title ? true : false} type="submit">
          Enviar
        </Button>
      </Form>
    </NoteContainer>
  );
}
