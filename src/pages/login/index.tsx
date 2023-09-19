import { useState } from "react";
import { Input } from "../../components/input";
import { Title } from "../../components/title";
import { Box, ButtonWrapper, ContentStyled, Section, Wrapper } from "./styles";
import { GiDialPadlock } from "react-icons/gi";

interface InputPasswordTypeProps {
  type: "password" | "text";
}
export function Login() {
  const [isVisible, setIsVisible] = useState<InputPasswordTypeProps>({
    type: "password",
  });
  function changeVisibleState() {
    if (isVisible.type === "password") {
      setIsVisible({ type: "text" });
    } else {
      setIsVisible({ type: "password" });
    }
  }
  return (
    <Box>
      <Section>
        <Title />
        <span>
          <GiDialPadlock size={100} />
        </span>
      </Section>
      <ContentStyled>
        <form>
          <h1>Login</h1>
          <Wrapper>
            <Input placeholder="Entrar com a e-mail" type={"email"} />
            <Input
              placeholder="Entrar com a senha"
              type={isVisible.type}
              handleSeePassword={changeVisibleState}
            />
          </Wrapper>
          <ButtonWrapper>
            <button type="button">entrar</button>
          </ButtonWrapper>
        </form>
      </ContentStyled>
    </Box>
  );
}
