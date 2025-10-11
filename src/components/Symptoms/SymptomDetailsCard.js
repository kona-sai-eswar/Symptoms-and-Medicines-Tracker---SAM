// "use client"

// import { deleteDate, deleteRecord, updateDescription, updateSeverity } from "@/lib/Symptoms/updateDetails"
// import { useRouter } from "next/navigation"
// import { useState } from "react"

// export default function SymptomDetailCard({date,id, symptom,setRefetchData, setSymptom}){
//     const router = useRouter()
//     const [editSevIndex, setEditSevIndex]=useState(null)
//     const [newSev, setNewSev]=useState(0)

//     const [editDesIndex, setEditDesIndex]=useState(null)
//     const [newDes, setNewDes]=useState("")

//     const [newErr, setNewErr]=useState({sev:"", des:""})
    
//     async function handleSev(recordID, oldSev){
//         if(Number(newSev)===0)
//             setNewErr(p=>({...p, sev:"Select a Severity"}))
//         else if(oldSev===newSev){
//             setEditSevIndex(null)
//             setNewErr(p=>({...p, sev:""}))
//         }else{

//             const updated = JSON.parse(JSON.stringify(symptom))
//             const dateIndex = updated.severity.findIndex(d => d._id === date._id)
//             if (dateIndex >= 0) {
//                 const recordIndex = updated.severity[dateIndex].records.findIndex(r => r._id === recordID)
//             if (recordIndex >= 0) {
//                 updated.severity[dateIndex].records[recordIndex].severity = newSev
//             }
//             }
//             setSymptom(updated)

//             let res = await updateSeverity(id, date._id, recordID, newSev)
//             if(res.success){
//                 router.refresh()
//                 setRefetchData(p=>!p)
//             }else{
//                 alert("Failed to update severity");
//             }
//             setNewErr(p=>({...p, sev:""}))
//             setEditSevIndex(null)
//         }
//         setNewSev("")
//     }

//     async function handleDes(recordID, oldDes){
//         if(newDes.trim()==="")
//             setNewErr(p=>({...p, des:"Enter about your severity"}))
//         else if(oldDes===newDes){
//             setEditDesIndex(null)
//             setNewErr(p=>({...p, des:""}))
//         }else{

//             const updated = JSON.parse(JSON.stringify(symptom))
//             const dateIndex = updated.severity.findIndex(d => d._id === date._id)
//             if (dateIndex >= 0) {
//                 const recordIndex = updated.severity[dateIndex].records.findIndex(r => r._id === recordID)
//             if (recordIndex >= 0) {
//                 updated.severity[dateIndex].records[recordIndex].description = newDes
//             }
//             }
//             setSymptom(updated)

//             let res = await updateDescription(id, date._id, recordID, newDes)
//             if(res.success){
//                 router.refresh()
//                 setRefetchData(p=>!p)
//             }else{
//                 alert("Failed to update description");
//             }
//             setNewErr(p=>({...p, des:""}))
//             setEditDesIndex(null)
//         }
//         setNewDes("")
//     }

//     async function handleRecordDelete(recordID){
//         let res;
//         if (confirm("Are you sure you want to delete this record?")){
//             const updated = JSON.parse(JSON.stringify(symptom))
//             let filteredArray=[]
//             const dateIndex = updated.severity.findIndex(d => d._id === date._id)
//             if (dateIndex >= 0) {
//                 filteredArray = updated.severity[dateIndex].records.filter(r => r._id !== recordID)
//                 updated.severity[dateIndex].records=filteredArray;
//             }
//             setSymptom(updated)
//             console.log("filtered array",filteredArray)
//             res=await deleteRecord(id, date._id, recordID)
//             if(res.success){
//                 router.refresh()
//             }else{
//                 alert("Failed to delete record");
//             }
//         }else{
//             alert("Record is not deleted")
//         }
        
        
//     }

//     async function handleDateDelete(){
//         let res;
//         if (confirm("Are you sure you want to delete all the records for this date?")){
//             const updated = JSON.parse(JSON.stringify(symptom))
//             let filteredArray=[]
//             filteredArray = updated.severity.filter(d => d._id !== date._id)
//             updated.severity=filteredArray;
//             setSymptom(updated)
//             // console.log("filtered array",filteredArray)
//             // console.log("updated array",updated)
//             res=await deleteDate(id, date._id)
//             if(res.success){
//                 router.refresh()
//             }else{
//                 alert("Failed to delete record");
//             }
//         }else{
//             alert("Records are not deleted")
//         }
//     }

//     return(
//         <>
//             {date?.records?.length>0 && <div>
//                 <div>{date?.date}</div>
//                 <button onClick={handleDateDelete}>Delete</button>
//                 </div>}
//                 <div className="grid grid-cols-3 gap-2">
//                 {
//                     date?.records?.toReversed().map((record,i)=>(
//                         <div key={record._id} className="border border-cyan-400">
//                             at{record?.time}
//                             severity {
//                                 editSevIndex===i? <>
//                                     <label>
//                                         <select value={newSev} onChange={(e)=>{setNewSev(e.target.value); setNewErr(p=>({...p, sev:""}))}}>
//                                         <option value="">Select</option>
//                                         {
//                                             Array.from({length:5},(_,i)=>i+1).map(sev=><option key={sev}>{sev}</option>)
//                                         }
//                                         </select>
//                                     </label>
//                                     {newErr.sev.length>0 && <>
//                                         <p>{newErr.sev}</p>
//                                     </>}
//                                     <button onClick={()=>handleSev(record?._id, record?.severity)} disabled={newErr.sev!==""} className="border border-red-500 bg-red-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Done</button>
//                                     <button onClick={()=>{setNewErr(p=>({...p, sev:""})); setNewSev(0); setEditSevIndex(null)}} className="border border-red-500 bg-red-500 cursor-pointer">Close</button>
//                                 </>
//                                 :<>
//                                 <span>{record?.severity}</span>
//                                 <button onClick={()=>setEditSevIndex(i)} className="border border-red-500 bg-red-500 cursor-pointer">Update</button>
//                                 </>
//                             }, 

//                             {
//                                 editDesIndex===i?<>
//                                     <textarea value={newDes} onChange={(e)=>{setNewDes(e.target.value); setNewErr(p=>({...p, des:""}))}}/>
//                                     {newErr.des.length>0 && <>
//                                     <p>{newErr.des}</p>
//                                     </>
//                                     }
//                                     <button onClick={()=>handleDes(record?._id, record?.description)} disabled={newErr.des!==""} className="border border-red-500 bg-red-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Done</button>
//                                     <button onClick={()=>{setNewErr(p=>({...p, des:""})); setNewDes(""); setEditDesIndex(null)}} className="border border-red-500 bg-red-500 cursor-pointer">Close</button>
//                                 </>:<>
//                                     <div className="flex gap-3">
//                                         {record?.description}
//                                         <button onClick={()=>setEditDesIndex(i)} className="border border-red-500 bg-red-500 cursor-pointer">Update</button>
//                                     </div>
//                                 </>
//                             }
                            
//                             <button 
//                                 className="border border-red-500 bg-red-500 cursor-pointer"
//                                 onClick={()=>handleRecordDelete(record._id)}
//                             >Delete</button>
//                         </div>
//                             ))
//                 }
//                 </div>
//         </>
//     )
// }


"use client"

import { deleteDate, deleteRecord, updateDescription, updateSeverity } from "@/lib/Symptoms/updateDetails"
import { useRouter } from "next/navigation"
import { useState } from "react"
import SymptomDisplay from "./SymptomDisplay"
import { FaTrash } from "react-icons/fa"
import today from "@/lib/today"

export default function SymptomDetailCard({date,id, symptom,setRefetchData, setSymptom, fromArchived=false}){
    const router = useRouter()
    // const [editSevIndex, setEditSevIndex]=useState(null)
    // const [newSev, setNewSev]=useState(0)

    // const [editDesIndex, setEditDesIndex]=useState(null)
    // const [newDes, setNewDes]=useState("")

    // const [newErr, setNewErr]=useState({sev:"", des:""})
    
    // async function handleSev(recordID, oldSev){
    //     if(Number(newSev)===0)
    //         setNewErr(p=>({...p, sev:"Select a Severity"}))
    //     else if(oldSev===newSev){
    //         setEditSevIndex(null)
    //         setNewErr(p=>({...p, sev:""}))
    //     }else{

    //         const updated = JSON.parse(JSON.stringify(symptom))
    //         const dateIndex = updated.severity.findIndex(d => d._id === date._id)
    //         if (dateIndex >= 0) {
    //             const recordIndex = updated.severity[dateIndex].records.findIndex(r => r._id === recordID)
    //         if (recordIndex >= 0) {
    //             updated.severity[dateIndex].records[recordIndex].severity = newSev
    //         }
    //         }
    //         setSymptom(updated)

    //         let res = await updateSeverity(id, date._id, recordID, newSev)
    //         if(res.success){
    //             router.refresh()
    //             setRefetchData(p=>!p)
    //         }else{
    //             alert("Failed to update severity");
    //         }
    //         setNewErr(p=>({...p, sev:""}))
    //         setEditSevIndex(null)
    //     }
    //     setNewSev("")
    // }

    // async function handleDes(recordID, oldDes){
    //     if(newDes.trim()==="")
    //         setNewErr(p=>({...p, des:"Enter about your severity"}))
    //     else if(oldDes===newDes){
    //         setEditDesIndex(null)
    //         setNewErr(p=>({...p, des:""}))
    //     }else{

    //         const updated = JSON.parse(JSON.stringify(symptom))
    //         const dateIndex = updated.severity.findIndex(d => d._id === date._id)
    //         if (dateIndex >= 0) {
    //             const recordIndex = updated.severity[dateIndex].records.findIndex(r => r._id === recordID)
    //         if (recordIndex >= 0) {
    //             updated.severity[dateIndex].records[recordIndex].description = newDes
    //         }
    //         }
    //         setSymptom(updated)

    //         let res = await updateDescription(id, date._id, recordID, newDes)
    //         if(res.success){
    //             router.refresh()
    //             setRefetchData(p=>!p)
    //         }else{
    //             alert("Failed to update description");
    //         }
    //         setNewErr(p=>({...p, des:""}))
    //         setEditDesIndex(null)
    //     }
    //     setNewDes("")
    // }

    // async function handleRecordDelete(recordID){
    //     let res;
    //     if (confirm("Are you sure you want to delete this record?")){
    //         const updated = JSON.parse(JSON.stringify(symptom))
    //         let filteredArray=[]
    //         const dateIndex = updated.severity.findIndex(d => d._id === date._id)
    //         if (dateIndex >= 0) {
    //             filteredArray = updated.severity[dateIndex].records.filter(r => r._id !== recordID)
    //             updated.severity[dateIndex].records=filteredArray;
    //         }
    //         setSymptom(updated)
    //         console.log("filtered array",filteredArray)
    //         res=await deleteRecord(id, date._id, recordID)
    //         if(res.success){
    //             router.refresh()
    //         }else{
    //             alert("Failed to delete record");
    //         }
    //     }else{
    //         alert("Record is not deleted")
    //     }
        
        
    // }

    async function handleDateDelete(){
        let res;
        if (confirm("Are you sure you want to delete all the records for this date?")){
            const updated = JSON.parse(JSON.stringify(symptom))
            let filteredArray=[]
            filteredArray = updated.severity.filter(d => d._id !== date._id)
            updated.severity=filteredArray;
            setSymptom(updated)
            // console.log("filtered array",filteredArray)
            // console.log("updated array",updated)
            res=await deleteDate(id, date._id)
            if(res.success){
                router.refresh()
            }else{
                alert("Failed to delete record");
            }
        }else{
            alert("Records are not deleted")
        }
    }


    return(
        <>
            {date?.records?.length>0 ? <><div className="flex gap-1 justify-center items-center mb-2">
                <div className="text-xl">{date?.date}</div>
                {!fromArchived && (date.date===today()) && <button onClick={handleDateDelete} className=" text-gray-500 hover:text-red-500 cursor-pointer"><FaTrash size={10}/></button>}
                </div>
                <div className="flex gap-2">
                { 
                  <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-2 py-3">
                    {date?.records
                      ?.toReversed()
                      .map((record) => 
                        <SymptomDisplay
                          key={record._id}
                          date={date}
                          id={symptom._id}
                          symptom={symptom}
                          setRefetchData={setRefetchData}
                          setSymptom={setSymptom}
                          record={record}
                          fromArchived={fromArchived}
                        />
                      )}
                  </div>
                }
                </div>
                </> : <p className="text-red-500">No Records</p>
            }
        </>
    )
}
