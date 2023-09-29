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
import { off, onValue, push, ref, remove, update } from "firebase/database";
import { database } from "../services";
import toast from "react-hot-toast";

interface NoteProviderProps {
  children: ReactNode;
}

interface InputPasswordTypeProps {
  type: "password" | "text";
}
interface NoteContextType {
  note: Notes | undefined;
  data: Notes[];
  title: string;
  isEditing: boolean;
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  annotation: string | undefined;
  addNote: (note: Notes) => void;
  updateNote: (id: string, newAnnotation: string, title?: string) => void;
  deleteNote: (id: string) => void;
  changeTextarea: () => void;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setNote: Dispatch<SetStateAction<Notes | undefined>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setAnnotation: Dispatch<SetStateAction<string>>;
  isVisible: InputPasswordTypeProps;
  changeVisibleState: () => void;
  activeUpdateNote: () => void;
}

type Feeling = {
  [key in
    | "happy"
    | "sad"
    | "anxious"
    | "insecure"
    | "excited"
    | "afraid"
    | "disciplined"
    | "focused"
    | "unshakable"]: boolean;
};

export type Notes = {
  id: string;
  title: string;
  feeling: Feeling;
  annotation: string;
  author: string;
  created: string;
};
export const NoteContext = createContext({} as NoteContextType);
export function NoteProvider({ children }: NoteProviderProps) {
  const { user } = useAuth();
  const [data, setData] = useState<Notes[]>([]);
  const [note, setNote] = useState<Notes>();
  const [annotation, setAnnotation] = useState("");
  const [title, setTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isVisible, setIsVisible] = useState<InputPasswordTypeProps>({
    type: "password",
  });

  useEffect(() => {
    if (!user) return;
    const todoRef = ref(database, `notes/${user.uid}`);

    // Firebase Realtime Event Listener
    onValue(todoRef, (room) => {
      const notesDatabase = room.val();
      const firebaseNotes: Notes[] =
        (notesDatabase && notesDatabase.notes) ?? {};

      const parsedNotes = Object.entries(firebaseNotes).map(([key, value]) => {
        return {
          id: key,
          title: value.title,
          author: value.author,
          feeling: value.feeling,
          created: value.created,
          annotation: value.annotation,
        };
      });

      setData(parsedNotes);
      console.log(data, 'data')
    });

    return () => off(todoRef);
  }, [user]);

  function changeVisibleState() {
    if (isVisible.type === "password") {
      setIsVisible({ type: "text" });
    } else {
      setIsVisible({ type: "password" });
    }
  }

  function changeTextarea() {
    const textarea = textareaRef.current;
    if (textarea !== null) {
      textarea.style.width = "100%";
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }

  useEffect(() => {
    changeTextarea();
  }, [annotation]);

  function activeUpdateNote() {
    setIsEditing((t) => !t);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 10);
  }

  async function addNote(note: Notes) {
    if (!user) return;
    const noteRef = ref(database, `notes/${user.uid}/notes`);
    await push(noteRef, note)
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

  async function deleteNote(id: string) {
    if (!user) return;
    const todoPath = ref(database, `notes/${user.uid}/notes/${id}`);
    await remove(todoPath);
    toast.success("Nota excluída com sucesso!", {
      position: "top-center",
      style: {
        background: "#232323",
        color: "#fff",
      },
    })
  }

  async function updateNote(id: string, newAnnotation: string, title?: string) {
    if (!user) return;
    const notePath = ref(database, `notes/${user.uid}/notes/${id}`);
    await update(notePath, { annotation: newAnnotation, title: title });
  }

  return (
    <NoteContext.Provider
      value={{
        data,
        note,
        title,
        textareaRef,
        isEditing,
        annotation,
        isVisible,
        changeVisibleState,
        deleteNote,
        addNote,
        changeTextarea,
        updateNote,
        activeUpdateNote,
        setIsEditing,
        setTitle,
        setAnnotation,
        setNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}
