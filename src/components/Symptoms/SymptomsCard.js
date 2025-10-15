"use client";
// import deleteSymptom from "@/lib/Symptoms/deleteSymptom";
import updateSymNamefn from "@/lib/Symptoms/updateSymName";
import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { FaTrash, FaCheck, FaTimes, FaPen, } from "react-icons/fa";
import { addToSaved, removeFromSaved } from "@/lib/Symptoms/savedAction";
import ModalDelete from "./ModalDelete";
import { MdSettingsBackupRestore } from "react-icons/md";
import ModalRestore from "./ModalRestore";

export default function SymptomsCard({ symptom, fromArchived=false, fromSaved=false}) {
  let [updateSymName, setUpdateSymName] = useState(false);
  let [symName, setSymName] = useState(symptom.name);
  const [toggleSaved, setToggleSaved]=useState(symptom.isSaved)
  const [deleteSym, setDeleteSym]=useState(false)
  const [restoreSym, setRestoreSym]=useState(false)
  const router = useRouter();

  const updateRef = useRef(null);

  useEffect(() => {
    if (updateSymName && updateRef.current) {
      updateRef.current.focus();
    }
  }, [updateSymName]);

  

  async function handleSymNameUpdate() {
    if (symName === symptom.name) setUpdateSymName(false);
    else {
      let res = await updateSymNamefn(symptom._id, symName);
      if (res.success) {
        router.refresh();
      } else {
        alert("Failed to update symptom");
      }
      setUpdateSymName(false);
    }
  }

  async function handleSaved(){
    setToggleSaved(p=>!p)
    try {
        if (toggleSaved) {
          // current state is saved → remove it
          const resp = await removeFromSaved(symptom._id);
          if (!resp.success) throw new Error("Failed to remove");
        } else {
          // current state is not saved → add it
          const resp = await addToSaved(symptom._id);
          if (!resp.success) throw new Error("Failed to add");
        }
      } catch (err) {
        // 2️⃣ Rollback if server fails
        setToggleSaved(prev => !prev);
        alert(err.message || "Failed to update symptom");
      }
  }

  return (<>             
    {deleteSym && <ModalDelete deleteSym={deleteSym} setDeleteSym={setDeleteSym} symptom={symptom} fromArchived={fromArchived}/>}
    {fromArchived && restoreSym && <ModalRestore setRestoreSym={setRestoreSym} symptom={symptom}/>}
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-4 flex flex-col justify-between transition-transform transform hover:scale-105">

      <div className="flex justify-between items-center">
      <button
        onClick={()=>setDeleteSym(p=>!p)}
        className="p-2 text-gray-500 hover:text-red-500 transition cursor-pointer"
      >
        <FaTrash size={15} />
      </button>
      {fromArchived ? <button
        onClick={()=>setRestoreSym(true)}
        className="p-2 text-gray-500 transition cursor-pointer "
      >
        <MdSettingsBackupRestore size={20}/>
      </button> : <button
        onClick={handleSaved}
        className="p-2 text-gray-500 transition cursor-pointer "
      >
        <Bookmark size={15} className={`hover:fill-black ${toggleSaved && "fill-black"}`}/>
      </button>}
      </div>
      <div className="flex justify-between items-center mb-3">
        {updateSymName ? (
          <>
            <div className="flex gap-2 w-full">
              <input
                type="text"
                value={symName}
                ref={updateRef}
                onChange={(e) => setSymName(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                onClick={handleSymNameUpdate}
                className="p-2 text-green-600 hover:text-green-700 transition cursor-pointer"
              >
                <FaCheck size={15} />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-2 w-full">
              <div className="text-lg font-semibold text-gray-800">
                {symptom.name}
              </div>
              {!fromArchived && <button
                onClick={() => {
                  setUpdateSymName(true);
                }}
                className="p-2 text-gray-500 hover:text-blue-500 transition cursor-pointer"
              >
                <FaPen size={10} />
              </button>}
            </div>
          </>
        )}
      </div>
      <button
        onClick={() => {if(fromArchived)
                          router.push(`/symptoms/${symptom._id}?isArchived=true`)
                        else if(fromSaved)
                          router.push(`/symptoms/${symptom._id}?isSaved=true`)
                        else
                          router.push(`/symptoms/${symptom._id}`)}}
        className="border rounded p-[5px] text-white bg-black mt-15 cursor-pointer"
      >
        View details
      </button>
    </div>
    </>
  );
}
