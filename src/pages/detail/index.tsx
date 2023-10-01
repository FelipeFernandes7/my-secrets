import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Notes } from "../../context/NoteContext";
import * as S from "./styles";

import { BiLeftArrowAlt } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { capitalizeFirstLetter, getRandomColor } from "../../helpers";
import { database } from "../../services";
import { onValue, ref } from "firebase/database";
import { useAuth, useNote } from "../../hooks";
import { translation } from "../../helpers/translation";
import { Spinner } from "../../components/spinner";

export function NoteDetail() {
  const { isEditing, setIsEditing, updateNote } = useNote();
  const navigate = useNavigate();
  const [note, setNote] = useState<Notes>();
  const { id } = useParams();
  const noteId = String(id);
  const { user } = useAuth();

  function back() {
    setIsEditing(false);
    navigate("/");
  }

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  function autoResize() {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }

  useEffect(() => {
    autoResize();
  }, [note?.annotation]);

  function activeUpdateNote() {
    setIsEditing((t) => !t);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.selectionStart = textareaRef.current.value.length;
        textareaRef.current.selectionEnd = textareaRef.current.value.length;
      }
    }, 10);
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
    return (
      <S.Loading>
        <Spinner
          style={{
            width: 200,
            height: 200,
          }}
        />
      </S.Loading>
    );
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
    <S.DetailWrapper>
      <S.ActionBox>
        <S.Action onClick={back}>
          <BiLeftArrowAlt />
        </S.Action>
        <S.Action
          style={{
            background: isEditing ? "#7158e2" : "#232323",
            color: "#fff",
          }}
          onClick={() => activeUpdateNote()}
        >
          <FaRegEdit />
        </S.Action>
      </S.ActionBox>
      {note.created && (
        <S.AnnotationDate>
          {format(new Date(note.created), "PP", {
            locale: ptBR,
          })}
        </S.AnnotationDate>
      )}
      <S.Form>
        <S.AnnotationTitle
          disabled={!isEditing}
          onChange={onChangeTitle}
          value={capitalizeFirstLetter(note ? note.title : "")}
        />
        <S.Textarea
          style={{ fontStyle: isEditing ? "italic" : "normal" }}
          id="annotation"
          ref={textareaRef}
          onInput={autoResize}
          disabled={!isEditing}
          onChange={onChangeAnnotation}
          value={note?.annotation}
        />
        {isEditing && (
          <S.Wrapper>
            <S.ButtonSubmit
              type="button"
              onClick={() => updateNote(noteId, note.annotation, note.title)}
            >
              Salvar Alteração
            </S.ButtonSubmit>
          </S.Wrapper>
        )}
        {note.feeling && (
          <S.FeelingWrapper>
            <h1>
              Sentimento:
              {translation(note).map((key) => (
                <span style={{ background: randomColor }} key={key}>
                  {key}
                </span>
              ))}
            </h1>
          </S.FeelingWrapper>
        )}
      </S.Form>
    </S.DetailWrapper>
  );
}
