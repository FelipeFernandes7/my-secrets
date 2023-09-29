import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NoteContext } from "../../context/NoteContext";
import { Card } from "../../components/card";

import * as S from "./styles";

import { MdAdd } from "react-icons/md";
import { NoRegister } from "../../components/noRegister";

export function Home() {
  const { data } = useContext(NoteContext);
  const navigate = useNavigate();
  function handleAddNewNote() {
    navigate("/note");
  }
  const noteCount = Object.keys(data).length;
  return (
    <S.HomeContainer>
      <S.StyledHomeContent>
        {!noteCount && <NoRegister />}
        {data.map((note) => (
          <Card
            key={note.id}
            week={note.created}
            hours={note.created}
            title={note.title}
            id={note.id}
          />
        ))}
      </S.StyledHomeContent>

      <S.AddBtn onClick={handleAddNewNote}>
        <MdAdd color="#fff" size={24} />
      </S.AddBtn>
    </S.HomeContainer>
  );
}
