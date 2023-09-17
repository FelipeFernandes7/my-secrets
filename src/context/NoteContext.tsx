import { ReactNode, createContext, useEffect, useState } from "react";
import { db } from "../services";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";

interface NoteProviderProps {
  children: ReactNode;
}

interface NoteContextType {
  data: Notes[];
  handleDeleteNote: (id: string) => void;
}

type Notes = {
  id: string;
  title: string;
  feeling: {
    happy: boolean;
    sad: boolean;
    excited: boolean;
  };
  note: string;
  created: Date;
};
export const NoteContext = createContext({} as NoteContextType);
export function NoteProvider({ children }: NoteProviderProps) {
  const [data, setData] = useState<Notes[]>([]);

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
    const docRef = collection(db, "notes");
    const docSnap = await getDocs(docRef);
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

  return (
    <NoteContext.Provider value={{ data, handleDeleteNote }}>
      {children}
    </NoteContext.Provider>
  );
}
