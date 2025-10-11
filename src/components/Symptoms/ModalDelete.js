import deleteSymptom from "@/lib/Symptoms/deleteSymptom";
import { MoveToHistory } from "@/lib/Symptoms/HistoryAction";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { CgClose } from "react-icons/cg";

export default function ModalDelete({
  deleteSym,
  setDeleteSym,
  symptom,
  fromArchived = false,
}) {
  let router = useRouter();
  async function handleSymDelete() {
    let res = await deleteSymptom(symptom._id);
    if (res.success) {
      router.refresh();
    } else {
      alert("Failed to delete symptom");
    }
    setDeleteSym(false);
  }

  async function handleMoveToHistory() {
    let res = await MoveToHistory(symptom._id);
    if (res.success) {
      router.refresh();
    } else {
      alert("Failed to delete symptom");
    }
    setDeleteSym(false);
  }

  return (
    <div
      onClick={() => setDeleteSym(false)}
      className="absolute top-0 left-0 z-50 bg-gray-200/50 h-screen w-screen flex justify-center items-center"
    >
      <div
        className="w-[300px] h-[200px] rounded bg-white shadow-lg relative flex flex-col justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setDeleteSym(false)}
          className="absolute top-5 right-5 cursor-pointer transform transition delay-150 hover:scale-125 hover:text-red-500"
        >
          <CgClose />
        </button>
        <div className="flex flex-col justify-center items-center gap-3 p-4 rounded">
          <button
            onClick={() => handleSymDelete()}
            className="border bg-red-500 text-white cursor-pointer rounded p-1 transform transition delay-300 hover:scale-125"
          >
            Delete Permantly
          </button>
          {!fromArchived && (
            <button
              onClick={() => handleMoveToHistory()}
              className="border bg-green-500 text-white cursor-pointer rounded p-1 transform transition delay-300 hover:scale-125"
            >
              Move to History
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
