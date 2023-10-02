import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import { BiLogIn } from "react-icons/bi";
import { Settings } from "../settings";
import { Button } from "@chakra-ui/react";
import * as S from "./styles";

export function Header() {
  const { loadingAuth, user } = useAuth();
  const signed = !!user;
  const navigate = useNavigate();
  function handleLogin() {
    navigate("/login");
  }
  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <S.Wrapper>
          <Settings />
        </S.Wrapper>
        <S.Name>{user?.name ?? "unknown"}</S.Name>
        <S.Wrapper>
          {!loadingAuth && signed && (
            <Button
              bg={"transparent"}
              color={"#fff"}
              width={"100%"}
              _hover={{ bg: "#7158e2" }}
              onClick={handleLogin}
            >
              <BiLogIn size={24} color={"#fff"} cursor={"pointer"} />
            </Button>
          )}
        </S.Wrapper>
      </S.HeaderContent>
    </S.HeaderContainer>
  );
}
