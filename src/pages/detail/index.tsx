import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { NoteContext, Notes } from "../../context/NoteContext";
import { translation } from "../../constants/note";
import {
  ActionContainer,
  DetailContainer,
  FeelingSection,
  NoteContainer,
  NotePad,
} from "./styles";

import { BiLeftArrowAlt } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { capitalizeFirstLetter, getRandomColor } from "../../utils";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services";

export function Detail() {
  const { id } = useParams();
  const {
    textareaRef,
    isEditing,
    annotation,
    note,
    setNote,
    setAnnotation,
    handleUpdateActive,
    handleUpdateNote,
  } = useContext(NoteContext);
  const navigate = useNavigate();

  
  const styledButtonEditing = {
    background: isEditing ? "#fff" : "rgb(15 23 42)",
    color: isEditing ? "rgb(15 23 42)" : "#fff",
  };

  const feelingNote =
    note?.feeling &&
    Object.keys(note?.feeling)
      .filter((key) => note?.feeling[key as keyof Notes["feeling"]] === true)
      .map((key) => translation[key as keyof typeof translation]);

  function toGoBack() {
    navigate("/");
  }
  function loadNote() {
    if (!id) return;
    const docRef = doc(db, "notes", id);
    getDoc(docRef).then((doc) => {
      if (!doc.data()) {
        navigate("/");
      }
      setAnnotation(doc.data()?.note);
      setNote({
        id: doc.id,
        created: doc.data()?.created.toDate(),
        feeling: doc.data()?.feeling,
        note: doc.data()?.note,
        title: doc.data()?.title,
      });
    });
  }

  useEffect(() => {
    loadNote();
  }, []);

  const randomColor = getRandomColor();
  return (
    <DetailContainer>
      <ActionContainer>
        <button onClick={toGoBack}>
          <BiLeftArrowAlt />
        </button>
        <button style={styledButtonEditing} onClick={handleUpdateActive}>
          <FaRegEdit />
        </button>
      </ActionContainer>
      <NoteContainer>
        <h1>
          {capitalizeFirstLetter(
            note?.title ? note.title : "Nenhum Título encontrado :("
          )}
        </h1>
        <div>
          <span>
            {note?.created &&
              format(new Date(note.created), "PP", {
                locale: ptBR,
              })}
          </span>
        </div>
      </NoteContainer>
      <NotePad>
        <textarea
          ref={textareaRef}
          disabled={!isEditing}
          onChange={(e) => setAnnotation(e.target.value)}
          id="annotation"
          value={annotation}
        />
        {isEditing && (
          <button onClick={() => handleUpdateNote(String(id))}>
            Atualizar Registro
          </button>
        )}
      </NotePad>
      <FeelingSection>
        <h1>
          Sentimento:
          {feelingNote?.map((key) => (
            <span style={{ background: randomColor }} key={key}>
              {key}
            </span>
          ))}
        </h1>
      </FeelingSection>
    </DetailContainer>
  );
}
