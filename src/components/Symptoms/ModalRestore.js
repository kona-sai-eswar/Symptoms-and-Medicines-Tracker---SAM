import { RestorefromHistory } from "@/lib/Symptoms/HistoryAction";
import { useRouter } from "next/navigation";
import { CgClose } from "react-icons/cg";

export default function ModalRestore({
  setRestoreSym,
  symptom,
}) {
  let router = useRouter();

  async function handleRestorefromHistory(moveToSaved) {
    let res = await RestorefromHistory(symptom._id, moveToSaved);
    if (res.success) {
      router.refresh();
    } else {
      alert("Failed to delete symptom");
    }
    setRestoreSym(false);
  }

  return (
    <div
      onClick={() => setRestoreSym(false)}
      className="absolute top-0 left-0 z-50 bg-gray-200/50 h-screen w-screen flex justify-center items-center"
    >
      <div
        className="w-[300px] h-[200px] rounded bg-white shadow-lg relative flex flex-col justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setRestoreSym(false)}
          className="absolute top-5 right-5 cursor-pointer transform transition delay-150 hover:scale-125 hover:text-red-500"
        >
          <CgClose />
        </button>
        <div className="flex flex-col justify-center items-center">
          <p className="text-center w-[77%]">Do you want to add this to saved list?</p>
          <div className="flex justify-center items-center gap-3 p-4 rounded">
            <button
            onClick={() => {handleRestorefromHistory(true)}}
            className="border bg-red-500 text-white cursor-pointer rounded p-1 w-[70px] transform transition delay-300 hover:scale-125"
          >
            Yes
          </button>
          
            <button
              onClick={() => {handleRestorefromHistory(false)}}
              className="border bg-green-500 text-white cursor-pointer rounded p-1 w-[70px] transform transition delay-300 hover:scale-125"
            >
              No
            </button>
              
          </div>
        </div>
      </div>
    </div>
  );
}
