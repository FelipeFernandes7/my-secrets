import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NoteContext } from "../../context/NoteContext";
import { Card } from "../../components/card";

import { MdAdd } from "react-icons/md";
import { NoRegister } from "../../components/noRegister";
import * as Chakra from "@chakra-ui/react";
export function Home() {
  const { data } = useContext(NoteContext);
  const navigate = useNavigate();
  function handleAddNewNote() {
    navigate("/note");
  }
  const noteCount = Object.keys(data).length;
  return (
    <Chakra.Flex
      w={"100%"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      position={"relative"}
    >
      <Chakra.Box
        width="100%"
        display={{ md: "grid", base: "flex" }}
        gap={{ md: "1rem", base: "0" }}
        mb="1.5rem"
        pl="1.5rem"
        pr="1.5rem"
        flexWrap={{ base: "wrap" }}
        gridTemplateColumns={{
          md: "repeat(auto-fit, minmax(400px, 1fr))",
          base: "none",
        }}
        transition="all linear 0.3s"
      >
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
      </Chakra.Box>

      <Chakra.Button
        position="fixed"
        display="flex"
        align-items="center"
        justify-content="center"
        bottom=" 2rem"
        backgroundColor="#6e72fc"
        backgroundImage="linear-gradient(315deg, #6e72fc 0%, #ad1deb 74%)"
        border="none"
        height="3.5rem"
        width="3.5rem"
        borderRadius="100%"
        cursor="pointer"
        transition="all linear 0.3s"
        onClick={handleAddNewNote}
        fontSize={"1.5rem"}
        color={"#fff"}
        _active={{
          transform: "scale(0.95)",
        }}
      >
        <Chakra.Icon as={MdAdd} />
      </Chakra.Button>
    </Chakra.Flex>
  );
}
