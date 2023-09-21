import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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
            <Link
              style={{
                textDecoration: "none",
                width: "100%",
                color: "#fff",
                transition: "all linear 0.3s",
              }}
              key={note.id}
              to={`/note/${note.id}`}
            >
              <Card
                week={note.created}
                hours={note.created}
                title={note.title}
                id={note.id}
              />
            </Link>
          ))}
      </Container>
      <AddBtn onClick={handleAddNewNote}>
        <MdAdd color="#fff" size={24} />
      </AddBtn>
    </HomeContainer>
  );
}
