import { useEffect, useState } from "react";
import { Input } from "../../components/input";
import { Title } from "../../components/title";

import * as S from "./styles";
import { Button } from "../../components/button";

import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../services";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth, useNote } from "../../hooks";

export function Login() {
  const { isVisible, changeVisibleState } = useNote();
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

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
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  function onSubmit(formData: FormData) {
    setIsLoading(true);
    const { email, password } = formData;
    signIn(email, password).then(() => {
      toast.success("Login efetuado com sucesso", {
        position: "top-center",
        style: {
          background: "#232323",
          color: "#fff",
        },
      });

      setIsLoading(false);
      navigate("/");
    }).catch((error) => {
      toast.error(error.message, {
        position: "top-center",
        style: {
          background: "#232323",
          color: "#fff",
        },
      });
      setIsLoading(false);
    });
  }

  useEffect(() => {
    async function handleLogout() {
      await signOut(auth);
    }
    handleLogout();
  }, []);

  return (
    <S.LoginContainer>
      <S.Content>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
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
              bgColor="#dbeafe"
              color="#000"
              isLoading={isLoading}
              type="submit"
              label={"Entrar"}
            />
          </S.IptContainer>
          <span>
            Ainda não tem uma conta? <Link to={"/register"}>Cadastre-se</Link>
          </span>
        </S.Form>
        <S.Box>
          <Title />
          <S.IconStyled />
        </S.Box>
      </S.Content>
    </S.LoginContainer>
  );
}
