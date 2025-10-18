"use client"
import addMedicine from "@/lib/Medicines/addMedicines";
import { FaTrash } from "react-icons/fa";
import { useActionState, useState } from "react";

export default function MedForm(){
    const [state, formAction, isPending]=useActionState(addMedicine, {error:{
        name:"", reason:"",dailyDosage:"",time:"",stock:"",start:"",end:""
    }})

    const [med, setMed]=useState({
        name:"", reason:"",dailyDosage:"",time:[],stock:"",start:"",end:""
    })

    function handleChange(e){
        setMed(p=>({...p, [e.target.name]:e.target.value}))
    }

    function handleDosageChange(e){
        console.log(e.target.value, med.dailyDosage)
        setMed(p=>({...p, [e.target.name]:Number(e.target.value), time:e.target.value==0? [] :p["time"] && e.target.value>p["dailyDosage"] ? [...p["time"], ... Array(Number(e.target.value)).fill("")] : p["time"].filter((_,i)=>i!==p["time"].length-1)}))
    }

    function handleTime(e,i){
        setMed(p=>{
            const timeArr=[...p.time]
            timeArr[i]=e.target.value
            return {...p, time:timeArr}
        })
    }

    function handleDeleteTime(index){
        console.log(med)
        setMed(p=>({
            ...p, time: p.time.filter((_,i)=>i!==index), dailyDosage:p.dailyDosage-1
        }))
    }

    return(
        <div>
            <form action={formAction}>
                <div>
                    <label>Medicine name</label>
                    <input type="text" name="name" value={med.name} onChange={handleChange}/>
                </div>

                <div>
                    <label>Medicine Reason</label>
                    <input type="text" name="reason" value={med.reason} onChange={handleChange}/>
                </div>

                <div>
                    <label>Daily intake</label>
                    <input type="text" name="dailyDosage" min={1} value={med.dailyDosage} onChange={handleDosageChange}/>
                </div>

                <div>
                    <label>Medicine timings</label>
                    {
                        med.time.map((time,i)=>{
                            return <div key={`${i}_${time}`}>
                               { med.dailyDosage >=1 && <> <input type="time" name="name" value={time} onChange={(e)=>handleTime(e,i)}/>
                                <button disabled={med.dailyDosage==1} onClick={()=>handleDeleteTime(i)} className="cursor-pointer disabled:cursor-not-allowed"><FaTrash size={18} /></button> </>}
                            </div>
                        })
                    }
                </div>

                <div>
                    <label>From</label>
                    <input type="date" name="start" value={med.start} onChange={handleChange}/>
                </div>

                <div>
                    <label>To</label>
                    <input type="date" name="end" value={med.end} onChange={handleChange}/>
                </div>

                <div>
                    <label>Current Stock of this medicine(in tablets)</label>
                    <input type="number" name="stock" min={1} value={med.stock} onChange={handleChange}/>
                </div>
                <button type="submit" disabled={isPending}>
                    {isPending ? "Saving..." : "Save Medicine"}
                </button>
            </form>
        </div>
    )
}