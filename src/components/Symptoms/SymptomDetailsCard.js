"use client"

import { deleteDate, deleteRecord, updateDescription, updateSeverity } from "@/lib/Symptoms/updateDetails"
import { useRouter } from "next/navigation"
import { useState } from "react"
import SymptomDisplay from "./SymptomDisplay"
import { FaTrash } from "react-icons/fa"
import today from "@/lib/today"

export default function SymptomDetailCard({date,id, symptom,setRefetchData, setSymptom, fromArchived=false}){
    const router = useRouter()

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
