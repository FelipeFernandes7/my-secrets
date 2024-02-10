import { ImSpinner10 } from "react-icons/im";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../../services";
import { get, ref } from "firebase/database";
import { useAuth } from "../../hooks";
import { Annotation } from "../../context/AnnotationContext";

export function NoteDetail() {
  const { user } = useAuth();
  const [annotationData, setAnnotationData] = useState<Annotation>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const annotationId = String(id);

  useEffect(() => {
    const fetchAnnotation = async () => {
      try {
        if (!user) throw new Error("User not found");

        const annotationRef = ref(
          database,
          `${user.uid}/annotations/${annotationId}`,
        );
        const snapshot = await get(annotationRef);

        if (snapshot.exists()) {
          const annotation = snapshot.val();
          setAnnotationData({
            id: snapshot.key as string,
            annotation: annotation.annotation,
            created: annotation.created,
            title: annotation.title,
          });
        } else {
          throw new Error("Annotation not found");
        }
      } catch (error) {
        console.error("Error fetching annotation:", error);
        setAnnotationData(undefined);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnotation();
  }, [id]);

  if (loading) {
    return (
      <main className="flex justify-center items-center h-[75vh] ">
        <ImSpinner10 size={40} className="animate-spin text-[#c026d3]" />
      </main>
    );
  }

  if (!annotationData) {
    return (
      <div className="w-full flex flex-col items-center px-6">
        <h1 className="text-2xl font-bold ">No Annotation Found</h1>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center px-6">
      <h1 className="text-2xl font-bold ">Olá {user?.name}</h1>
      <span>Minha Anotação</span>
      <h3>{annotationData.annotation}</h3>
      <h3>{annotationData.title}</h3>
    </div>
  );
}
