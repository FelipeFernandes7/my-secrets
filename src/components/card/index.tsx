import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BiSolidTrashAlt } from "react-icons/bi";
import * as S from "./styles";
import { useContext } from "react";
import { NoteContext } from "../../context/NoteContext";
import { Link } from "react-router-dom";

type CardProps = {
  id: string;
  week: string;
  hours: string;
  title: string;
};
export function Card({ week, hours, title, id }: CardProps) {
  const { deleteNote } = useContext(NoteContext);
  const styledIcon = {
    cursor: "pointer",
    color: "rgb(220 38 38)",
    fontSize: 24,
  };

  return (
    <S.CardContainer>
      <S.DeleteContainer onClick={() => deleteNote(id)}>
        <BiSolidTrashAlt style={styledIcon} />
      </S.DeleteContainer>
      <S.Section>
        <h1>{format(new Date(week), "EEEE", { locale: ptBR })}</h1>
        <span>{format(new Date(hours), "p", { locale: ptBR })}h</span>
      </S.Section>
      <S.Title>
        <Link
          style={{
            textDecoration: "none",
            width: "100%",
            color: "#fff",
            transition: "all linear 0.3s",
          }}
          to={`notes/${id}`}
        >
          <h1>{title}</h1>
        </Link>
      </S.Title>
    </S.CardContainer>
  );
}
