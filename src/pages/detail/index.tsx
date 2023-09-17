import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Notes } from "../../context/NoteContext";
import { doc, getDoc} from "firebase/firestore";
import { db } from "../../services";

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

export function Detail() {
  const [note, setNote] = useState<Notes>();
  const [annotation, setAnnotation] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const feelingNote =
    note?.feeling &&
    Object.keys(note?.feeling)
      .filter((key) => note?.feeling[key as keyof Notes["feeling"]] === true)
      .map((key) => translation[key as keyof typeof translation]);

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
  function capitalizeFirstLetter(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  function handleScroll() {
    setIsEditing((t) => !t);
    const nextSection = document.getElementById("annotation");

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  }
  function toGoBack() {
    navigate("/");
  }
 
  // async function handleUpdateNote() {
  //   try {
  //     const docRef = doc(db, "notes");
  //     await updateDoc(docRef, {
  //       note: note?.note,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const randomColor = getRandomColor();
  return (
    <DetailContainer>
      <ActionContainer>
        <button onClick={toGoBack}>
          <BiLeftArrowAlt />
        </button>
        <button onClick={handleScroll}>
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
        <h1 id="annotation" contentEditable={isEditing} >
          {annotation}
        </h1>
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
