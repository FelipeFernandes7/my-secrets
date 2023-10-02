import * as chakra from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import * as icon from "@chakra-ui/icons";

export function Settings() {
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
      <chakra.MenuList
        color={"#fff"}
        bg={"#232323"}
        border={"none"}
      >
        <chakra.MenuItem icon={<icon.AddIcon />} command="⌘T">
          New Tab
        </chakra.MenuItem>
        <chakra.MenuItem icon={<icon.ExternalLinkIcon />} command="⌘N">
          New Window
        </chakra.MenuItem>
        <chakra.MenuItem icon={<icon.RepeatIcon />} command="⌘⇧N">
          Open Closed Tab
        </chakra.MenuItem>
        <chakra.MenuItem icon={<icon.EditIcon />} command="⌘O">
          Open File...
        </chakra.MenuItem>
      </chakra.MenuList>
    </chakra.Menu>
  );
}
