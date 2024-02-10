import { ImSpinner10 } from "react-icons/im";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { database } from "../../services";
import { get, ref } from "firebase/database";
import { useAnnotation, useAuth } from "../../hooks";
import { Annotation } from "../../context/AnnotationContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { z } from "zod";
import { FaArrowLeft, FaEdit } from "react-icons/fa";

export function AnnotationDetail() {
  const [annotationData, setAnnotationData] = useState<Annotation>();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { updateAnnotation } = useAnnotation();
  const navigate = useNavigate();

  const { user } = useAuth();
  const { id } = useParams();

  const schema = z.object({
    title: z.string(),
    annotation: z.string(),
  });

  type FormData = z.infer<typeof schema>;
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function handleFormValues(formValues: FormData) {
    const { annotation, title } = formValues;
    if (!user) return;
    updateAnnotation(String(id), title, annotation);
    setIsEditing(false);
  }

  useEffect(() => {
    const fetchAnnotation = async () => {
      try {
        if (!user) throw new Error("User not found");

        const annotationRef = ref(
          database,
          `${user.uid}/annotations/${String(id)}`,
        );
        const snapshot = await get(annotationRef);

        if (snapshot.exists()) {
          const annotation = snapshot.val();
          setAnnotationData({
            id: snapshot.key as string,
            annotation: annotation.annotation,
            created: annotation.created,
            title: annotation.title,
          });
        } else {
          throw new Error("Annotation not found");
        }
      } catch (error) {
        console.error("Error fetching annotation:", error);
        setAnnotationData(undefined);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnotation();
  }, [id]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }, [annotationData?.annotation, isEditing]);

  if (loading) {
    return (
      <main className="flex justify-center items-center h-[75vh] ">
        <ImSpinner10 size={40} className="animate-spin text-[#c026d3]" />
      </main>
    );
  }

  if (!annotationData) {
    return (
      <div className="w-full flex flex-col items-center px-6">
        <h1 className="text-2xl font-bold ">No Annotation Found</h1>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center px-6 h-full">
      <section className="w-full md:max-w-[600px] flex justify-between items-center px-4 mt-6">
        <button
          onClick={() => navigate("/")}
          className="active:scale-95 transition-all duration-300 font-bold text-center bg-gradient-to-r from-[#4f46e5] to-[#c026d3] rounded-xl p-3 flex items-center justify-center"
        >
          <FaArrowLeft className="text-white text-xl text-center" />
        </button>
        <h1 className="text-lg font-medium">
          {format(new Date(annotationData.created), "PP", { locale: ptBR })}
        </h1>
        <button
          onClick={() => setIsEditing((state) => !state)}
          className={`active:scale-95 transition-all duration-300 rounded-xl p-3 flex items-center justify-center ${
            isEditing
              ? "bg-gradient-to-r from-[#4f46e5] to-[#c026d3] text-white"
              : "bg-neutral-700"
          }`}
        >
          <FaEdit className="text-white text-xl text-center" />
        </button>
      </section>
      <form
        onSubmit={handleSubmit(handleFormValues)}
        className="w-full flex flex-col mt-5 md:max-w-[600px] gap-5 mb-6"
      >
        <input
          type="text"
          {...register("title")}
          defaultValue={annotationData.title}
          className={`w-full p-2 mb-4 bg-transparent font-bold text-xl outline-none text-center rounded-xl ${
            isEditing ? "border-[1px] border-slate-600 " : "border-0"
          }`}
          disabled={!isEditing}
        />
        <textarea
          {...register("annotation")}
          defaultValue={annotationData.annotation}
          ref={textareaRef}
          disabled={!isEditing}
          className={`overflow-hidden w-full p-2 mb-4 bg-transparent rounded-xl font-normal text-lg outline-none h-auto resize-none ${
            isEditing ? "border-[1px] border-slate-600 " : "border-0"
          }`}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto";
            target.style.height = target.scrollHeight + "px";
          }}
        />
        {isEditing && (
          <button
            type="submit"
            className="p-2 md:p-2 text-lg font-medium w-full flex items-center justify-center bg-gradient-to-r from-[#4f46e5] to-[#c026d3] rounded-xl"
          >
            Salvar Anotação
          </button>
        )}
      </form>
    </div>
  );
}
