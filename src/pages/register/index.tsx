import { useEffect, useState } from "react";
import { Input } from "../../components/input";
import { Spinner } from "../../components/spinner";
import { useNote } from "../../hooks";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { z } from "zod";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../services";

import * as S from "./styles";

interface ConfPasswordVisible {
  type: "password" | "text";
}

const schema = z.object({
  name: z.string().nonempty("Campo nome é obrigatório"),
  email: z
    .string()
    .email("Insira um email válido")
    .nonempty("O campo email é obrigatório"),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .nonempty("O campo senha é obrigatório"),
  confPassword: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .nonempty("O campo senha é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export function Register() {
  const navigate = useNavigate();
  const { isVisible, changeVisibleState } = useNote();
  const [isLoading, setIsLoading] = useState(false);
  const [confPasswordIsVisible, setConfPasswordIsVisible] =
    useState<ConfPasswordVisible>({
      type: "password",
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  async function onSubmit(formData: FormData) {
    console.log("clicou");
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then(async (user) => {
        await updateProfile(user.user, {
          displayName: formData.name,
        });

        toast.success("Usuário cadastrado com sucesso", {
          style: {
            backgroundColor: "#232323",
            color: "#fff",
          },
          position: "top-center",
        });
        setIsLoading(false);
        setInterval(() => {
          navigate("/", { replace: true });
        }, 3000);
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(
          "Houve um erro durante o cadastro, tente novamente mais tarde :(",
          {
            style: {
              backgroundColor: "#232323",
              color: "#fff",
            },
            position: "top-center",
          }
        );
        setIsLoading(false);
      });
  }
  useEffect(() => {
    async function handleLogout() {
      await signOut(auth);
    }
    handleLogout();
  }, []);

  function handleShowConfPassword() {
    setConfPasswordIsVisible({
      type: confPasswordIsVisible.type === "password" ? "text" : "password",
    });
  }

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Cadastro</h1>
        <S.FormContent>
          <Input
            name="name"
            type={"user"}
            label="Nome de usuário"
            placeholder={"Digite o nome de usuário"}
            register={register}
            error={errors.name}
          />
          <Input
            name="email"
            type={"email"}
            label="E-mail"
            placeholder={"Digite o seu e-mail"}
            register={register}
            error={errors.email}
          />
          <Input
            name="password"
            type={isVisible.type}
            label="Senha"
            handleSeePassword={changeVisibleState}
            placeholder={"Digite sua senha"}
            register={register}
            error={errors.password}
          />
          <Input
            name="confPassword"
            type={confPasswordIsVisible.type}
            label="Confirme senha"
            handleSeePassword={handleShowConfPassword}
            placeholder={"Confirme sua senha"}
            register={register}
            error={errors.confPassword}
          />
          <button type="submit">
            {isLoading ? (
              <Spinner style={{ width: 80, height: 80 }} />
            ) : (
              "Salvar"
            )}
          </button>
        </S.FormContent>
      </S.Form>
    </S.Container>
  );
}
