import { useNavigate } from "react-router-dom";
import { Card } from "../../components/card";

import { MdAdd } from "react-icons/md";
import { HiOutlineAnnotation } from "react-icons/hi";
import { useAnnotation } from "../../hooks";
export function Home() {
  const { data } = useAnnotation();
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/annotation");
  };
  const annotationCount = Object.keys(data).length;

  return (
    <div className="w-full flex flex-col items-center px-4">
      <h1 className="text-2xl font-bold mt-5 bg-gradient-to-r from-[#4f46e5] to-[#c026d3] bg-clip-text text-transparent">
        Minhas Anotações
      </h1>
      <section className="w-full mt-5 flex flex-wrap justify-center items-center gap-4 md:px-4 py-4 md:py-0">
        {annotationCount > 0 ? (
          data?.map((item) => (
            <Card
              key={item.id}
              annotationTitle={item.title}
              inHours={item.created}
              created={item.created}
              id={item.id}
            />
          ))
        ) : (
          <div className="w-full flex items-center justify-center flex-col gap-2 p-4 opacity-95 h-[50vh]">
            <HiOutlineAnnotation className="text-slate-600" size={100} />
            <h1 className="text-slate-600 text-2xl md:text-xl whitespace-pre-wrap text-center ">
              Oops, parece que você ainda não tem anotações
            </h1>
          </div>
        )}
      </section>

      <button
        onClick={handleNavigate}
        className="active:scale-95 transition-all duration-300 fixed bottom-7 bg-gradient-to-r from-[#4f46e5] to-[#c026d3] h-16 w-16 md:h-14 md:w-14 rounded-full flex items-center justify-center"
      >
        <MdAdd className="text-white text-4xl md:text-2xl" />
      </button>
    </div>
  );
}
