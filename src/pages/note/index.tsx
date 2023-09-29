import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { noteLinks } from "../../constants/note";

import { Feeling } from "../../components/feeling";

import { useAuth, useNote } from "../../hooks";
import { v4 as uuid } from "uuid";
import * as S from "./styles";

type FeelingProps = {
  happy: boolean;
  sad: boolean;
  anxious: boolean;
  insecure: boolean;
  excited: boolean;
  afraid: boolean;
  disciplined: boolean;
  focused: boolean;
  unshakable: boolean;
};
const feelingObj = {
  happy: false,
  sad: false,
  anxious: false,
  insecure: false,
  excited: false,
  afraid: false,
  disciplined: false,
  focused: false,
  unshakable: false,
};
export function Note() {
  const [feeling, setFeeling] = useState<FeelingProps>(feelingObj);
  const [annotation, setAnnotation] = useState("");
  const [title, setTitle] = useState("");
  const { addNote } = useNote();
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleSubmitAnnotation(e: FormEvent) {
    e.preventDefault();
    if (annotation.trim().length > 0) {
      addNote({
        id: uuid(),
        feeling: feeling,
        title: title,
        annotation: annotation,
        author: user ? user.uid : "unknown author",
        created: new Date().toISOString(),
      });
      setAnnotation("");
      navigate("/");
    }
  }

  return (
    <S.NoteContainer>
      <S.Title>
        <h1>Como foi seu dia hoje?</h1>
      </S.Title>
      <S.Form onSubmit={handleSubmitAnnotation}>
        <p>Faça uma anotação!</p>
        <S.FormContent>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título"
          />
          <textarea
            value={annotation}
            onChange={(e) => setAnnotation(e.target.value)}
            placeholder="Registre sua nota..."
          />
        </S.FormContent>
        <S.Section>
          <p>Sentimento?</p>
          <S.BtnContainer>
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
          </S.BtnContainer>
        </S.Section>
        <S.Section>
          <p>Acesse meu GitHub ⬇ </p>
          <Link to={noteLinks.url} target="_blank">
            deixe uma estrela :) ⭐!
          </Link>
        </S.Section>
        <S.Button disabled={!annotation || !title ? true : false} type="submit">
          Enviar
        </S.Button>
      </S.Form>
    </S.NoteContainer>
  );
}
