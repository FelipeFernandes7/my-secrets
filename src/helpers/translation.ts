import { Notes } from "../context/NoteContext";
import { translated } from "../constants/note";

export function translation(notes: Notes) {
  const noteFeelingTranslated =
    notes?.feeling &&
    Object.keys(notes?.feeling)
      .filter((key) => notes?.feeling[key as keyof Notes["feeling"]] === true)
      .map((key) => translated[key as keyof typeof translation]);
  return noteFeelingTranslated;
}
