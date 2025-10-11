"use client"

import { deleteDate, deleteRecord, updateDescription, updateSeverity } from "@/lib/Symptoms/updateDetails"
import today from "@/lib/today"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { FaPen, FaTrash } from "react-icons/fa"

export default function SymptomDisplay({date,id, symptom,setRefetchData, setSymptom, record, fromArchived=false}){
    const router = useRouter()
    const [editSev, setEditSev]=useState(false)
    const [newSev, setNewSev]=useState(record.severity)

    const [editDes, setEditDes]=useState(false)
    const [newDes, setNewDes]=useState(record.description)

    useEffect(() => {
        setNewSev(record.severity);
        setNewDes(record.description);
      }, [record.severity, record.description]);
      


    const [newErr, setNewErr]=useState({sev:"", des:""})
    
    async function handleSev(recordID, oldSev){
        if(Number(newSev)===0){
            // setNewSev(newSev)
            setNewErr(p=>({...p, sev:"Select a Severity"}))
        }else if(Number(oldSev)===Number(newSev)){
            setEditSev(false)
            setNewErr(p=>({...p, sev:""}))
        }else{

            const updated = JSON.parse(JSON.stringify(symptom))
            const dateIndex = updated.severity.findIndex(d => d._id === date._id)
            if (dateIndex >= 0) {
                const recordIndex = updated.severity[dateIndex].records.findIndex(r => r._id === recordID)
            if (recordIndex >= 0) {
                updated.severity[dateIndex].records[recordIndex].severity = Number(newSev)
            }
            }
            setSymptom(updated)

            let res = await updateSeverity(id, date._id, recordID, newSev)
            if(res.success){
                router.refresh()
                setRefetchData(p=>!p)
            }else{
                alert("Failed to update severity");
            }
            setNewErr(p=>({...p, sev:""}))
            setEditSev(false)
            // setNewSev(record.severity)

        }
    }

    async function handleDes(recordID, oldDes){
        if(newDes.trim()===""){
            setNewErr(p=>({...p, des:"Enter about your severity"}))
        }else if(oldDes===newDes){
            setEditDes(false)
            setNewErr(p=>({...p, des:""}))
        }else{

            const updated = JSON.parse(JSON.stringify(symptom))
            const dateIndex = updated.severity.findIndex(d => d._id === date._id)
            if (dateIndex >= 0) {
                const recordIndex = updated.severity[dateIndex].records.findIndex(r => r._id === recordID)
            if (recordIndex >= 0) {
                updated.severity[dateIndex].records[recordIndex].description = newDes
            }
            }
            setSymptom(updated)

            let res = await updateDescription(id, date._id, recordID, newDes)
            if(res.success){
                router.refresh()
                setRefetchData(p=>!p)
            }else{
                alert("Failed to update description");
            }
            setNewErr(p=>({...p, des:""}))
            setEditDes(false)
            // setNewDes(record.description)

        }
    }

    async function handleRecordDelete(recordID){
        let res;
        if (confirm("Are you sure you want to delete this record?")){
            const updated = JSON.parse(JSON.stringify(symptom))
            let filteredArray=[]
            const dateIndex = updated.severity.findIndex(d => d._id === date._id)
            if (dateIndex >= 0) {
                filteredArray = updated.severity[dateIndex].records.filter(r => r._id !== recordID)
                updated.severity[dateIndex].records=filteredArray;
            }
            setSymptom(updated)
            console.log("filtered array",filteredArray)
            res=await deleteRecord(id, date._id, recordID)
            if(res.success){
                router.refresh()
            }else{
                alert("Failed to delete record");
            }
        }else{
            alert("Record is not deleted")
        }
        
        
    }

    // async function handleDateDelete(){
    //     let res;
    //     if (confirm("Are you sure you want to delete all the records for this date?")){
    //         const updated = JSON.parse(JSON.stringify(symptom))
    //         let filteredArray=[]
    //         filteredArray = updated.severity.filter(d => d._id !== date._id)
    //         updated.severity=filteredArray;
    //         setSymptom(updated)
    //         // console.log("filtered array",filteredArray)
    //         // console.log("updated array",updated)
    //         res=await deleteDate(id, date._id)
    //         if(res.success){
    //             router.refresh()
    //         }else{
    //             alert("Failed to delete record");
    //         }
    //     }else{
    //         alert("Records are not deleted")
    //     }
    // }

    return(
        <>
            {/* {date?.records?.length>0 && <div>
                <div>{date?.date}</div>
                <button onClick={handleDateDelete}>Delete</button>
                </div>} */}
                
                        {/* <div key={record._id} className="flex flex-col border border-cyan-400 rounded p-2 min-w-[150px] max-h-[200px] min-h-[250px]">
                            <div>At {record?.time}</div>
                            <div>
                            severity {
                                editSev? <>
                                    <label>
                                        <select value={newSev} onChange={(e)=>{setNewSev(e.target.value); setNewErr(p=>({...p, sev:""}))}}>
                                        <option value="">Select</option>
                                        {
                                            Array.from({length:5},(_,i)=>i+1).map(sev=><option key={sev}>{sev}</option>)
                                        }
                                        </select>
                                    </label>
                                    {newErr.sev.length>0 && <>
                                        <p>{newErr.sev}</p>
                                    </>}
                                    <button onClick={()=>handleSev(record?._id, record?.severity)} disabled={newErr.sev!==""} className="border border-red-500 bg-red-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Done</button>
                                    <button onClick={()=>{setNewErr(p=>({...p, sev:""})); setNewSev(record.severity); setEditSev(false)}} className="border border-red-500 bg-red-500 cursor-pointer">Close</button>
                                </>
                                :<>
                                <span>{record?.severity}</span>
                                <button onClick={()=>setEditSev(p=>!p)} className="border border-red-500 bg-red-500 cursor-pointer">Update</button>
                                </>
                            }

                            </div>

                            <div>
                            {
                                editDes?<>
                                    <textarea value={newDes} onChange={(e)=>{setNewDes(e.target.value); setNewErr(p=>({...p, des:""}))}}/>
                                    {newErr.des.length>0 && <>
                                    <p>{newErr.des}</p>
                                    </>
                                    }
                                    <button onClick={()=>handleDes(record?._id, record?.description)} disabled={newErr.des!==""} className="border border-red-500 bg-red-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Done</button>
                                    <button onClick={()=>{setNewErr(p=>({...p, des:""})); setNewDes(record.description); setEditDes(false)}} className="border border-red-500 bg-red-500 cursor-pointer">Close</button>
                                </>:<>
                                    <div className="flex gap-3">
                                        {record?.description}
                                        <button onClick={()=>setEditDes(p=>!p)} className="border border-red-500 bg-red-500 cursor-pointer">Update</button>
                                    </div>
                                </>
                            }
                            </div>
                            
                            <button 
                                className="border border-red-500 bg-red-500 cursor-pointer"
                                onClick={()=>handleRecordDelete(record._id)}
                            >Delete</button>
                        </div> */}

<div
  key={record._id}
  className="flex flex-col justify-between p-4 bg-gradient-to-br from-cyan-400 to-blue-500 text-white rounded-xl shadow-md min-w-[220px] max-w-[220px] min-h-[200px] max-h-[300px] snap-center transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl overflow-auto scrollbar-hide">
  <div>
    <div className="flex justify-between items-center">
    <p className="text-sm opacity-80 mb-1">At {record?.time}</p>
    {!fromArchived && (date.date===today()) && <button
    className="mt-2 hover:text-red-600 py-1 rounded text-sm cursor-pointer"
    onClick={() => handleRecordDelete(record._id)}
  >
    <FaTrash/>
  </button>}
    </div>

    <div className="mb-2">
      <span className="font-semibold">Severity: </span>
      {editSev ? (
        <div className="mt-1 space-x-2">
          <select
            value={newSev}
            onChange={(e) => {
              setNewSev(e.target.value);
              setNewErr((p) => ({ ...p, sev: "" }));
            }}
            className="bg-white text-black rounded px-2 py-1 text-sm"
          >
            <option value="">Select</option>
            {Array.from({ length: 5 }, (_, i) => i + 1).map((sev) => (
              <option key={sev}>{sev}</option>
            ))}
          </select>
          {newErr.sev && <p className="text-red-500">Severity is required</p>}
          <div className="flex gap-2 mt-1">
          <button
            onClick={() => handleSev(record?._id, record?.severity)}
            disabled={newErr.sev !== ""}
            className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Update
          </button>
          <button
            onClick={() => {
              setNewErr((p) => ({ ...p, sev: "" }));
              setNewSev(record.severity);
              setEditSev(false);
            }}
            className="bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded text-sm cursor-pointer"
          >
            Cancel   
          </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="font-bold">{record?.severity}</span>
          {!fromArchived && (date.date===today()) && <button
            onClick={() => setEditSev(true)}
            className="text-yellow-400 hover:text-yellow-500 cursor-pointer py-0.5 text-xs"
          >
            <FaPen/>
          </button>}
        </div>
      )}
    </div>

    <div className="text-sm">
      {editDes ? (
        <div className="flex flex-col gap-1">
          <textarea
            value={newDes}
            onChange={(e) => {
              setNewDes(e.target.value);
              setNewErr((p) => ({ ...p, des: "" }));
            }}
            className="text-black border rounded p-1 text-sm"
          />
          {newErr.des && <p className="text-red-500">{newErr.des}</p>}
          <div className="flex gap-2">
            <button
              onClick={() => handleDes(record?._id, record?.description)}
              disabled={newErr.des!==""}
              className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Update
            </button>
            <button
              onClick={() => {
                setEditDes(false);
                setNewDes(record.description);
              }}
              className="bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded text-sm cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 items-start">
          <p className="overflow-y-auto scrollbar-hide max-w-[160px] max-h-[100px]">{record?.description}</p>
          {!fromArchived && (date.date===today()) && <button
            onClick={() => setEditDes(true)}
            className="text-yellow-400 hover:text-yellow-500 py-0.5 text-xs cursor-pointer"
          >
            <FaPen/>
          </button>}
        </div>
      )}
    </div>
  </div>

  
</div>

                            
        </>
    )
}
