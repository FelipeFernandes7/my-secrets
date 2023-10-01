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

type InputPasswordTypeProps = {
  type: "password" | "text";
};
type NoteContextType = {
  data: Notes[];
  isVisible: InputPasswordTypeProps;
  isEditing: boolean;
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  addNote: (note: Notes) => void;
  updateNote: (id: string, newAnnotation?: string, title?: string) => void;
  deleteNote: (id: string) => void;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  changeVisibleState: () => void;
};

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
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isVisible, setIsVisible] = useState<InputPasswordTypeProps>({
    type: "password",
  });

  useEffect(() => {
    if (!user) return;
    const todoRef = ref(database, `notes/${user.uid}`);
    console.log(user, "user");
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
    await remove(todoPath)
      .then(() => {
        toast.success("Nota excluída com sucesso!", {
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

  async function updateNote(
    id: string,
    newAnnotation?: string,
    title?: string
  ) {
    if (!user) return;
    const notePath = ref(database, `notes/${user.uid}/notes/${id}`);
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
    <NoteContext.Provider
      value={{
        data,
        textareaRef,
        isEditing,
        isVisible,
        changeVisibleState,
        deleteNote,
        addNote,
        updateNote,
        setIsEditing,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}
