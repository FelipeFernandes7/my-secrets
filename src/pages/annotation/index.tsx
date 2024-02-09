import { useNavigate } from "react-router-dom";

import { useAnnotation, useAuth } from "../../hooks";
import { v4 as uuid } from "uuid";
import { TextField } from "../../components/textField";
import { AnnotationField } from "./annotationField";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function Annotation() {
  const { addAnnotation } = useAnnotation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const schema = z.object({
    title: z.string().nonempty("O campo título é obrigatório"),
    annotation: z.string().nonempty("O campo anotação é obrigatório"),
  });

  type FormData = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function handleFormValues(formValues: FormData) {
    const { annotation, title } = formValues;
    if (!user) return;
    addAnnotation({
      id: uuid(),
      title: title,
      annotation: annotation,
      created: new Date().toISOString(),
    });
    navigate("/");
  }

  return (
    <div className="w-full px-4 flex flex-col items-center ">
      <h1 className="text-xl font-bold mt-5">
        Olá {user?.name}, deseja anotar algo?
      </h1>
      <form
        onSubmit={handleSubmit(handleFormValues)}
        className="w-full flex flex-col mt-5 md:max-w-[600px] gap-5"
      >
        <TextField
          label="Título"
          type={"text"}
          placeholder="Título da anotação"
          register={register}
          name="title"
          error={errors.title}
        />
        <AnnotationField
          label="Anotação"
          type={"text"}
          placeholder="Digite sua Anotação"
          name="annotation"
          register={register}
          error={errors.annotation}
        />

        <button
          type="submit"
          className="p-3 md:p-2 text-lg font-medium w-full flex items-center justify-center bg-gradient-to-r from-[#4f46e5] to-[#c026d3] rounded-xl"
        >
          Salvar Anotação
        </button>
      </form>
    </div>
  );
}
