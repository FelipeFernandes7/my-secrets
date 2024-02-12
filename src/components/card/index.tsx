import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BiSolidTrashAlt } from "react-icons/bi";

import { Link, useNavigate } from "react-router-dom";
import { useAnnotation } from "../../hooks";
import { useState } from "react";
import { ModalAlert } from "../modal/alert";

interface CardProps {
  id: string;
  created: string;
  inHours: string;
  annotationTitle: string;
}
export function Card({ created, inHours, annotationTitle, id }: CardProps) {
  const [showButton, setShowButton] = useState(false);
  const [annotationId, setAnnotationId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const currentDate = new Date();
  const formattedDate =
    currentDate.getDay() === new Date(created).getDay()
      ? "Hoje"
      : format(new Date(created), "EEEE", { locale: ptBR });

  const { deleteAnnotation } = useAnnotation();
  const navigate = useNavigate();

  const showDeleteButton = () => {
    setShowButton((state) => !state);
  };

  async function handleDelete(id: string) {
    if (id === annotationId) {
      await deleteAnnotation(id);
      navigate("/");
      setIsOpen(false);
      setAnnotationId("");
    }
  }

  const openModal = () => {
    setAnnotationId(id);
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
    setShowButton(false);
  };

  return (
    <div
      onClick={showDeleteButton}
      className="active:scale-95 flex flex-col relative transition-all duration-300 w-full bg-[#181818] rounded-xl md:max-w-[380px] cursor-pointer"
    >
      {showButton && (
        <div className="absolute top-6 right-6 transition-all duration-300 ease-linear">
          <BiSolidTrashAlt
            onClick={openModal}
            className="text-[#c026d3] text-2xl"
          />
        </div>
      )}
      <section className="flex flex-col px-6 py-6 gap-2">
        <p className="text-white text-lg font-medium">{formattedDate}</p>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#4f46e5] to-[#c026d3] bg-clip-text text-transparent">
          {format(new Date(inHours), "p", { locale: ptBR })}h
        </h1>
      </section>
      <section className="flex flex-col items-center justify-center pb-10">
        <Link
          className="w-full flex justify-center items-center "
          to={`annotation/${id}`}
        >
          <h1 className="overflow-hidden text-ellipsis text-xl font-medium text-[#c026d3] hover:font-bold transition-all duration-300 max-w-[200px] whitespace-nowrap">
            {annotationTitle}
          </h1>
        </Link>
      </section>
      <ModalAlert
        isOpen={isOpen}
        onClose={onClose}
        deleteAnnotation={() => handleDelete(id)}
      />
    </div>
  );
}
