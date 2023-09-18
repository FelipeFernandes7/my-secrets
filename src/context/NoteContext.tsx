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
import { db } from "../services";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";

interface NoteProviderProps {
  children: ReactNode;
}

interface NoteContextType {
  note: Notes | undefined;
  data: Notes[];
  isEditing: boolean;
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  annotation: string | undefined;
  setNote: Dispatch<SetStateAction<Notes | undefined>>;
  setAnnotation: Dispatch<SetStateAction<string>>;
  handleDeleteNote: (id: string) => void;
  handleTextareaChange: () => void;
  handleUpdateNote: (id: string) => void;
  handleUpdateActive: () => void;
  fetchDocs: () => void;
}

export type Notes = {
  id: string;
  title: string;
  feeling: {
    happy: boolean;
    sad: boolean;
    anxious: boolean;
    insecure: boolean;
    excited: boolean;
    afraid: boolean;
    disciplined: boolean;
    focused: boolean;
    unshakable: boolean;
  };
  note: string;
  created: Date;
};
export const NoteContext = createContext({} as NoteContextType);
export function NoteProvider({ children }: NoteProviderProps) {
  const [data, setData] = useState<Notes[]>([]);
  const [note, setNote] = useState<Notes>();
  const [annotation, setAnnotation] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  async function handleDeleteNote(id: string) {
    const docRef = doc(db, "notes", id);
    await deleteDoc(docRef);
    toast.success("Nota deletada com sucesso!", {
      position: "top-center",
      style: {
        background: "#232323",
        color: "#fff",
      },
    });
    fetchDocs();
  }

  async function fetchDocs() {
    const notesCollection = collection(db, "notes");
    const q = query(notesCollection, orderBy("created", "desc"));
    const docSnap = await getDocs(q);
    const noteDoc = [] as Notes[];
    docSnap.forEach((doc) => {
      noteDoc.push({
        id: doc.id,
        created: doc.data().created.toDate(),
        feeling: doc.data().feeling,
        note: doc.data().note,
        title: doc.data().title,
      });
    });
    setData(noteDoc);
  }
  useEffect(() => {
    fetchDocs();
  }, []);

  function handleTextareaChange() {
    const textarea = textareaRef.current;
    if (textarea !== null) {
      textarea.style.width = "100%";
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }

  useEffect(() => {
    handleTextareaChange();
  }, [annotation]);

  function handleUpdateActive() {
    setIsEditing((t) => !t);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 10);
  }

  async function handleUpdateNote(id: string) {
    try {
      const docRef = doc(db, "notes", String(id));
      await updateDoc(docRef, {
        note: annotation,
      });
      toast.success("Nota atualizada com sucesso!", {
        position: "top-center",
        style: {
          background: "#232323",
          color: "#fff",
        },
      });
      fetchDocs();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao atualizar a nota!", {
        position: "top-center",
        style: {
          background: "#232323",
          color: "#fff",
        },
      });
    }
  }

  return (
    <NoteContext.Provider
      value={{
        data,
        note,
        textareaRef,
        isEditing,
        annotation,
        handleDeleteNote,
        handleTextareaChange,
        handleUpdateNote,
        handleUpdateActive,
        fetchDocs,
        setAnnotation,
        setNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}
