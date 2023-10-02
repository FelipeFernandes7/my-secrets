import { Link } from "react-router-dom";
import { useAuth } from "../../hooks";
import { Settings } from "../settings";
import * as Chakra from "@chakra-ui/react";
import { Wrapper } from "./styles";

export function Header() {
  const { user } = useAuth();

  return (
    <Chakra.Box
      as="header"
      w={"100%"}
      display={"flex"}
      height={"5rem"}
      alignItems={"center"}
      width={"100%"}
      mb={"1.5rem"}
    >
      <Chakra.Box
        as="div"
        display={"flex"}
        alignItems={"center"}
        flexDirection={"row"}
        h={"5rem"}
        justifyContent={"space-between"}
        w={"100%"}
        gap={"0.5rem"}
        pl={"1.5rem"}
        pr={".5rem"}
      >
        <Chakra.Text fontSize={{ md: "1.5rem", base: "1rem" }}><Link to={"/"}>⌘</Link></Chakra.Text>
        <Chakra.Text
          w={{ md: "auto", base: "100%" }}
          textAlign={"center"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          whiteSpace="nowrap"
          fontSize={{ md: "1.3rem", base: "1rem" }}
          fontWeight={700}
          backgroundColor={"#6e72fc"}
          backgroundImage="linear-gradient(315deg, #6e72fc 0%, #ad1deb 74%)"
          css={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <Link to={"/"}>{user?.name ?? "unknown"}</Link>
        </Chakra.Text>

        <Wrapper>
          <Settings />
        </Wrapper>
      </Chakra.Box>
    </Chakra.Box>
  );
}
