import * as chakra from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import * as icon from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export function Settings() {
  const navigate = useNavigate();
  return (
    <chakra.Menu>
      <chakra.MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<icon.HamburgerIcon />}
        variant="outlined"
        color={"#fff"}
        border={"none"}
        fontSize={"1.5rem"}
        outline={"none"}
      />
      <chakra.MenuList color={"#fff"} bg={"#232323"} border={"none"}>
        <chakra.MenuItem icon={<icon.EmailIcon />} command="⌘A">
          Conta
        </chakra.MenuItem>
        <chakra.MenuItem icon={<icon.DeleteIcon />} command="⌘T">
          Lixeira
        </chakra.MenuItem>
        <chakra.MenuItem
          icon={<icon.AddIcon />}
          command="⌘C"
          onClick={() => navigate("/note")}
        >
          Criar Anotação
        </chakra.MenuItem>
      </chakra.MenuList>
    </chakra.Menu>
  );
}
