import { useState } from "react";
import { Input } from "../../components/input";
import { Title } from "../../components/title";

import * as S from "./styles";
import { Button } from "../../components/button";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
interface InputPasswordTypeProps {
  type: "password" | "text";
}
export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState<InputPasswordTypeProps>({
    type: "password",
  });
  const schema = z.object({
    email: z
      .string()
      .email("Informe um e-mail válido")
      .nonempty("O e-mail é obrigatório"),
    password: z.string().nonempty("O campo senha é obrigatório"),
  });

  type FormData = z.infer<typeof schema>;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  function onSubmit(formData: FormData) {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then(() => {
        toast.success("Login efetuado com sucesso", {
          position: "top-center",
          style: {
            background: "#232323",
            color: "#fff",
          },
        });
        setIsLoading(false);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        toast.error("Não foi possível realizar o login :(", {
          position: "top-center",
          style: {
            background: "#232323",
            color: "#fff",
          },
        });
        setIsLoading(false);
        console.log(error.message);
      });
  }
  function changeVisibleState() {
    if (isVisible.type === "password") {
      setIsVisible({ type: "text" });
    } else {
      setIsVisible({ type: "password" });
    }
  }

  return (
    <S.LoginContainer>
      <S.Content>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.Text>
            <h1>Login</h1>
          </S.Text>
          <S.IptContainer>
            <Input
              name="email"
              label="E-mail"
              type={"email"}
              placeholder="Entrar com e-mail..."
              error={errors.email}
              register={register}
            />
            <Input
              label="Senha"
              type={isVisible.type}
              name="password"
              placeholder="Entrar com a senha"
              register={register}
              handleSeePassword={changeVisibleState}
              error={errors.password}
            />
            <Button
              disabled={
                getValues("email") === "" ||
                (getValues("password") === "" && true)
              }
              bgColor="#dbeafe"
              color="#000"
              isLoading={isLoading}
              type="submit"
              label={"Entrar"}
            />
          </S.IptContainer>
        </form>
        <S.Box>
          <Title />
          <S.IconStyled />
        </S.Box>
      </S.Content>
    </S.LoginContainer>
  );
}
