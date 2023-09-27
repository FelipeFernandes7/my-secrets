import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NoteContext } from "../context/NoteContext";

export const useAuth = () => useContext(AuthContext);
export const useNote = () => useContext(NoteContext);
