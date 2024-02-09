import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AnnotationContext } from "../context/AnnotationContext";

export const useAuth = () => useContext(AuthContext);
export const useAnnotation = () => useContext(AnnotationContext);
