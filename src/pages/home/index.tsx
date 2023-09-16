import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NoteContext } from "../../context/NoteContext";
import { Container } from "../../components/container";
import { Card } from "../../components/card";

import { AddBtn, HomeContainer } from "./styles";

import { MdAdd } from "react-icons/md";

export function Home() {
  const { data } = useContext(NoteContext);
  const navigate = useNavigate();
  function handleAddNewNote() {
    navigate("/note");
  }
  return (
    <HomeContainer>
      <Container>
        {data.length > 0 &&
          data.map((note) => (
            <Card
              key={note.id}
              week={note.created}
              hours={note.created}
              title={note.title}
              id={note.id}
            />
          ))}
      </Container>
      <AddBtn onClick={handleAddNewNote}>
        <MdAdd color="#fff" size={24} />
      </AddBtn>
    </HomeContainer>
  );
}
