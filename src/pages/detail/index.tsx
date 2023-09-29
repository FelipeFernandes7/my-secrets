import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Notes } from "../../context/NoteContext";
import * as S from "./styles";

import { BiLeftArrowAlt } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { capitalizeFirstLetter, getRandomColor } from "../../helpers";
import { database } from "../../services";
import { Textarea } from "../../components/textarea";
import { onValue, ref } from "firebase/database";
import { useAuth, useNote } from "../../hooks";
import { translation } from "../../helpers/translation";

export function NoteDetail() {
  const { id } = useParams();
  const noteId = String(id);
  const navigate = useNavigate();
  const { isEditing, textareaRef, setIsEditing, activeUpdateNote, updateNote } =
    useNote();
  const { user } = useAuth();
  const [note, setNote] = useState<Notes>();

  const styledButtonEditing = {
    background: isEditing ? "#fff" : "rgb(15 23 42)",
    color: isEditing ? "rgb(15 23 42)" : "#fff",
  };

  function toGoBack() {
    setIsEditing(false);
    navigate("/");
  }
  useEffect(() => {
    if (!noteId) return;

    const noteRef = ref(database, `notes/${user?.uid}/notes/${noteId}`);

    const getData = onValue(noteRef, (snapshot) => {
      const data: Notes = {
        id: noteId,
        annotation: snapshot.val().annotation,
        title: snapshot.val().title,
        author: snapshot.val().author,
        created: snapshot.val().created,
        feeling: snapshot.val().feeling,
      };
      setNote(data);
    });

    return () => {
      getData();
    };
  }, [noteId]);

  if (!note) {
    return <div>Carregando...</div>;
  }

  function onChangeTitle(e: ChangeEvent<HTMLTextAreaElement>) {
    const hasNote = note && Object.keys(note).length;
    if (hasNote) {
      setNote({ ...note, id: noteId, title: e.target.value });
    }
  }

  function onChangeAnnotation(e: ChangeEvent<HTMLTextAreaElement>) {
    const hasNote = note && Object.keys(note).length;
    if (hasNote) {
      setNote({ ...note, id: noteId, annotation: e.target.value });
    }
  }

  const randomColor = getRandomColor();

  return (
    <S.DetailContainer>
      <S.ActionContainer>
        <button onClick={toGoBack}>
          <BiLeftArrowAlt />
        </button>
        <button style={styledButtonEditing} onClick={activeUpdateNote}>
          <FaRegEdit />
        </button>
      </S.ActionContainer>
      <S.NoteContainer>
        <Textarea
          disabled={!isEditing}
          onChange={onChangeTitle}
          value={capitalizeFirstLetter(note ? note.title : "")}
        />
        <div>
          <span>
            {note?.created &&
              format(new Date(note.created), "PP", {
                locale: ptBR,
              })}
          </span>
        </div>
      </S.NoteContainer>
      <S.NotePad>
        <textarea
          style={{
            height: note.annotation.length < 100 ? "auto" : "500px",
            overflowY: note.annotation.length >= 500 ? "auto" : "hidden",
          }}
          ref={textareaRef}
          disabled={!isEditing}
          onChange={onChangeAnnotation}
          id="annotation"
          value={note?.annotation}
        />
      </S.NotePad>
      <S.containerButtonRegister>
        {isEditing && (
          <button
            onClick={() => updateNote(noteId, note?.annotation, note?.title)}
          >
            Atualizar Registro
          </button>
        )}
      </S.containerButtonRegister>
      <S.FeelingSection>
        <h1>
          Sentimento:
          {translation(note).map((key) => (
            <span style={{ background: randomColor }} key={key}>
              {key}
            </span>
          ))}
        </h1>
      </S.FeelingSection>
      {isEditing && (
        <S.Warning>
          Agora você poderá atualizar o título e a anotação!
        </S.Warning>
      )}
    </S.DetailContainer>
  );
}
