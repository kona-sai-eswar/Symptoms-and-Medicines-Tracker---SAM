"use client"

import SymptomsCard from "@/components/Symptoms/SymptomsCard"
import {useState, useMemo} from "react"
import useDebounce from "@/hooks/useDebounce"

export default function SymptomsClient({symptoms, fromArchived=false, fromSaved=true}){
 
    const [search, setSearch] = useState("")
    const {debounce} = useDebounce(search)

    const filteredSym=useMemo(()=>{ return debounce? symptoms.filter(sym=>sym.name.toLowerCase().includes(debounce.toLowerCase())):symptoms},[debounce, symptoms])

    return(
        <>
        <input type="text" placeholder="Search for Symptoms..." value={search} onChange={e=>setSearch(e.target.value)} className="border rounded-lg p-2 m-2 mt-0 w-1/2 mx-auto"/>

        {filteredSym.length===0 && <p className="text-center mx-auto text-red-500 self-center">No Symptoms Found</p> }

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {   
                filteredSym.toReversed().map(sym=>{
                    return <SymptomsCard symptom={sym} key={sym._id} fromArchived={fromArchived} fromSaved={fromSaved}/>
                })
            }
        </div>
        </>
 )
}