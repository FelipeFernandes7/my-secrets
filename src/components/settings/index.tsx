import * as chakra from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import * as icon from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
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
      <chakra.MenuList color={"#fff"} bg={"#191919"} border={"none"}>
        <chakra.MenuItem
          icon={<icon.AddIcon />}
          command="⌘C"
          onClick={() => navigate("/note")}
        >
          Criar Anotação
        </chakra.MenuItem>
        <chakra.MenuItem icon={<icon.EmailIcon />} command="⌘A">
          Conta
        </chakra.MenuItem>
        <chakra.MenuItem
          icon={<BiLogIn />}
          command="⌘E"
          onClick={() => navigate("/login")}
        >
          Sair
        </chakra.MenuItem>
      </chakra.MenuList>
    </chakra.Menu>
  );
}
