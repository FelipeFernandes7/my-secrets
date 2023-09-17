import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BiSolidTrashAlt } from "react-icons/bi";
import { CardContainer, DeleteContainer, Section, Title } from "./styles";
import { useContext } from "react";
import { NoteContext } from "../../context/NoteContext";

interface CardProps {
  id: string;
  week: Date;
  hours: Date;
  title: string;
}
export function Card({ week, hours, title, id }: CardProps) {
  const {handleDeleteNote} = useContext(NoteContext)
  const styledIcon = {
    cursor: "pointer",
    color: "rgb(220 38 38)",
    fontSize: 24,
  };

  return (
    <CardContainer>
      <DeleteContainer onClick={() => handleDeleteNote(id)}>
        <BiSolidTrashAlt style={styledIcon} />
      </DeleteContainer>
      <Section>
        <h1>{format(new Date(week), "EEEE", { locale: ptBR })}</h1>
        <span>{format(new Date(hours), "p", { locale: ptBR })}h</span>
      </Section>
      <Title>
        <h1>{title}</h1>
      </Title>
    </CardContainer>
  );
}
