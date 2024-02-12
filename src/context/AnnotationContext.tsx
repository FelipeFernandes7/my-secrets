/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAuth } from "../hooks";
import {
  DataSnapshot,
  off,
  onValue,
  push,
  ref,
  remove,
  update,
} from "firebase/database";
import { database } from "../services";
import toast from "react-hot-toast";

interface AnnotationProviderProps {
  children: ReactNode;
}

type AnnotationContextType = {
  data: Annotation[];
  isEditing: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  addAnnotation: (value: Annotation) => void;
  updateAnnotation: (
    id: string,
    newAnnotation?: string,
    title?: string,
  ) => void;
  deleteAnnotation: (id: string) => void;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export type Annotation = {
  id: string;
  title: string;
  annotation: string;
  created: string;
};
export const AnnotationContext = createContext({} as AnnotationContextType);
export function AnnotationProvider({ children }: AnnotationProviderProps) {
  const { user } = useAuth();
  const [data, setData] = useState<Annotation[]>([]);

  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!user) return;
    const todoRef = ref(database, `${user.uid}/annotations`);
    const handleData = (snapshot: DataSnapshot) => {
      const notesDatabase = snapshot.val();
      if (!notesDatabase) return;
      const firebaseNotes: Record<string, any> = notesDatabase;

      const parsedNotes = Object.entries(firebaseNotes).map(([key, value]) => ({
        id: key,
        title: value.title,
        created: value.created,
        annotation: value.annotation,
      }));

      setData(parsedNotes);
    };

    onValue(todoRef, handleData);

    return () => {
      off(todoRef, "value", handleData);
    };
  }, [user?.uid]);

  async function addAnnotation(annotation: Annotation) {
    if (!user) return;
    const userRef = ref(database, `${user.uid}/annotations`);
    await push(userRef, annotation)
      .then(() => {
        toast.success("Nota adicionada com sucesso!", {
          position: "top-center",
          style: {
            background: "#232323",
            color: "#fff",
          },
        });
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-center",
          style: {
            background: "#232323",
            color: "#fff",
          },
        });
      });
  }

  async function deleteAnnotation(id: string) {
    if (!user) throw new Error("User not found");

    const todoPath = ref(database, `${user.uid}/annotations/${id}`);
    await remove(todoPath)
      .then(() => {
        setData((prevData) =>
          prevData.filter((annotation) => annotation.id !== id),
        );
        toast.success("Nota excluída com sucesso!", {
          position: "top-center",
          style: {
            background: "#232323",
            color: "#fff",
          },
        });
      })
      .catch((error) => {
        console.error("Error deleting annotation:", error.message);
        toast.error(error.message, {
          position: "top-center",
          style: {
            background: "#232323",
            color: "#fff",
          },
        });
      });
  }

  async function updateAnnotation(
    id: string,
    title?: string,
    newAnnotation?: string,
  ) {
    if (!user) return;
    const notePath = ref(database, `${user.uid}/annotations/${id}`);
    await update(notePath, { annotation: newAnnotation, title: title })
      .then(() => {
        toast.success("Nota atualizada com sucesso!", {
          position: "top-center",
          style: {
            background: "#232323",
            color: "#fff",
          },
        });
        setIsEditing(false);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-center",
          style: {
            background: "#232323",
            color: "#fff",
          },
        });
      });
  }

  return (
    <AnnotationContext.Provider
      value={{
        data,
        textareaRef,
        isEditing,
        isOpen,
        onOpen,
        onClose,
        deleteAnnotation,
        addAnnotation,
        updateAnnotation,
        setIsEditing,
      }}
    >
      {children}
    </AnnotationContext.Provider>
  );
}
