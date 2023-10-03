import { useRef } from "react";
import * as Chakra from "@chakra-ui/react";
import { useParams } from "react-router-dom";

type AlertProps = {
  isOpen: boolean;
  onClose: () => void;
  deleteAnnotation: (id: string) => void;
};
export function Alert({ isOpen, onClose, deleteAnnotation }: AlertProps) {
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const { id } = useParams();
  const noteId = String(id);

  return (
    <Chakra.AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <Chakra.AlertDialogOverlay />

      <Chakra.AlertDialogContent
        background={"#191919"}
        color={"#fff"}
        w={"350px"}
      >
        <Chakra.AlertDialogHeader>Deseja Excluir</Chakra.AlertDialogHeader>
        <Chakra.AlertDialogCloseButton />
        <Chakra.AlertDialogBody color={"#fff"} textAlign={"center"}>
          Essa anotação será deletada permanentemente, deseja continuar?
        </Chakra.AlertDialogBody>
        <Chakra.AlertDialogFooter>
          <Chakra.Button
            bg={"#232323"}
            color={"#fff"}
            ref={cancelRef}
            onClick={onClose}
          >
            Nâo
          </Chakra.Button>
          <Chakra.Button
            onClick={() => deleteAnnotation(noteId)}
            color={"#fff"}
            backgroundColor={"#6e72fc"}
            backgroundImage={"linear-gradient(315deg, #6e72fc 0%, #ad1deb 74%)"}
            ml={3}
          >
            Sim
          </Chakra.Button>
        </Chakra.AlertDialogFooter>
      </Chakra.AlertDialogContent>
    </Chakra.AlertDialog>
  );
}
