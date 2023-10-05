/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Chakra from "@chakra-ui/react";
import { ReactNode } from "react";

interface ModalDefaultProps {
  isOpen: boolean;
  onClose: () => void;
  size: "sm" | "md" | "lg" | "xl" | "full";
  title: string;
  icon?: any;
  children: ReactNode;
}
export function ModalDefault({
  icon,
  isOpen,
  onClose,
  title,
  size,
  children,
}: ModalDefaultProps) {
  return (
    <Chakra.Drawer onClose={onClose} isOpen={isOpen} size={size}>
      <Chakra.DrawerOverlay />
      <Chakra.DrawerContent bg={"#131313"}>
        <Chakra.DrawerCloseButton />
        <Chakra.DrawerHeader
          ml={{ base: "0", md: "1.5rem" }}
          w={"100%"}
          color={"#fff"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={{ base: "center", md: "flex-start" }}
          fontFamily={"Montserrat"}
          fontSize={{ base: "1.3rem", md: "1.5rem" }}
          fontWeight={"bold"}
          whiteSpace={"nowrap"}
          gap={"0.5rem"}
        >
          <Chakra.Icon as={icon} />
          {title}
        </Chakra.DrawerHeader>
        <Chakra.DrawerBody padding={0} h={"100vh"}>{children}</Chakra.DrawerBody>
      </Chakra.DrawerContent>
    </Chakra.Drawer>
  );
}
