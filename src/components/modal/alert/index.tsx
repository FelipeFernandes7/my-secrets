import { useEffect } from "react";
import { useParams } from "react-router-dom";

interface ModalAlertProps {
  isOpen: boolean;
  onClose: () => void;
  deleteAnnotation: (id: string) => void;
}

export function ModalAlert({
  isOpen,
  onClose,
  deleteAnnotation,
}: ModalAlertProps) {
  const { id } = useParams();
  const annotationId = String(id);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    } else {
      document.removeEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div className=" flex absolute inset-0 items-center justify-center z-50 ">
          <div className="absolute bg-black opacity-50" onClick={onClose}></div>
          <div className="relative bg-neutral-900 p-8 rounded-xl">
            <h2 className="text-white text-lg font-bold mb-4">
              Deseja Excluir
            </h2>
            <button
              className="active:scale-95 transition-all duration-300 absolute top-0 right-0 p-2"
              onClick={onClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="text-white text-center mb-4">
              Essa anotação será deletada permanentemente, deseja continuar?
            </div>
            <div className="flex justify-center">
              <button
                className="active:scale-95 transition-all duration-300 bg-gray-600 text-white px-4 py-2 rounded-xl mr-2"
                onClick={onClose}
              >
                Não
              </button>
              <button
                className="active:scale-95 transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-4 py-2 rounded-xl"
                onClick={() => deleteAnnotation(annotationId)}
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
