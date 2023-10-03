import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BiSolidTrashAlt } from "react-icons/bi";
import * as Chakra from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";
import { useNote } from "../../hooks";
import { useState } from "react";
import { Alert } from "../modal/alert";
import { useDisclosure } from "@chakra-ui/react";

type CardProps = {
  id: string;
  week: string;
  hours: string;
  title: string;
};
export function Card({ week, hours, title, id }: CardProps) {
  const [showTrashIcon, setShowTrashIcon] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [noteId, setNoteId] = useState("");
  const navigate = useNavigate();

  const handleCardClick = () => {
    setShowTrashIcon((state) => !state);
  };

  const { deleteNote } = useNote();
 
  async function deleteAnnotation(id: string) {
    if (id === noteId) {
      await deleteNote(id);
      navigate("/");
      setNoteId("");
    }
  }

  function handleOpen() {
    setNoteId(id);
    onOpen();
  }

  return (
    <Chakra.Flex
      onClick={handleCardClick}
      position={"relative"}
      flexDirection={"column"}
      borderRadius={"0.5rem"}
      cursor={"pointer"}
      bg={"#181818"}
      transition={"all linear 0.3s"}
      w={"100%"}
      h={"12em"}
      _active={{
        transform: "scale(0.95)",
      }}
      marginBottom={{ base: "1rem", md: "0" }}
    >
      {showTrashIcon && (
        <Chakra.Box
          onClick={handleOpen}
          position={"absolute"}
          top={"1.5rem"}
          right={"1.5rem"}
          cursor={"pointer"}
          fontSize={"1.5rem"}
          color={"#ad1deb"}
          transition={"all linear 0.3s"}
        >
          <Chakra.Icon as={BiSolidTrashAlt} />
        </Chakra.Box>
      )}
      <Chakra.Flex
        w={"100%"}
        ml={"1.5rem"}
        mt={"1.5rem"}
        flexDirection={"column"}
        gap={"0.5rem"}
      >
        <Chakra.Text fontWeight={200} fontSize={"1rem"}>
          {format(new Date(week), "EEEE", { locale: ptBR })}
        </Chakra.Text>
        <Chakra.Text
          fontSize={"2rem"}
          fontWeight={400}
          gap={"0.5rem"}
          backgroundColor={"#6e72fc"}
          backgroundImage="linear-gradient(315deg, #6e72fc 0%, #ad1deb 74%)"
          css={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {format(new Date(hours), "p", { locale: ptBR })}h
        </Chakra.Text>
      </Chakra.Flex>
      <Chakra.Box
        w={"100%"}
        mt={"0.5rem"}
        p={"0.95rem"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Link
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            transition: "all linear 0.3s",
            width: "100%",
            color: "#fff",
          }}
          to={`notes/${id}`}
        >
          <Chakra.Text
            fontSize={"1.5rem"}
            fontWeight={400}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            maxW={{ base: "300px", md: "500px" }}
          >
            {title}
          </Chakra.Text>
        </Link>
      </Chakra.Box>
      <Alert
        isOpen={isOpen}
        onClose={onClose}
        deleteAnnotation={() => deleteAnnotation(id)}
      />
    </Chakra.Flex>
  );
}
