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
  Warning,
} from "./styles";

import { BiLeftArrowAlt } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { capitalizeFirstLetter, getRandomColor } from "../../helpers";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services";
import { Textarea } from "../../components/textarea";

export function Detail() {
  const { id } = useParams();
  const {
    textareaRef,
    isEditing,
    annotation,
    title,
    note,
    setNote,
    setTitle,
    setIsEditing,
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
    setIsEditing(false);
    navigate("/");
  }
  function loadNote() {
    if (!id) return;
    const docRef = doc(db, "notes", id);
    getDoc(docRef).then((doc) => {
      if (!doc.data()) {
        navigate("/");
      }
      setTitle(doc.data()?.title);
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
        <Textarea
          disabled={!isEditing}
          onChange={(e) => setTitle(e.target.value)}
          value={capitalizeFirstLetter(title)}
        />
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
      {isEditing && (
        <Warning>Agora você poderá atualizar o título e a anotação!</Warning>
      )}
    </DetailContainer>
  );
}
