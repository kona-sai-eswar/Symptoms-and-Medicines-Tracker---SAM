import api from "@/axios/api"
import ChartDisplay from "@/components/Symptoms/Charts/ChartDisplay"

export default async function Chart({params, searchParams}){
    const p = await params
    let searchParam = await searchParams
    const fromArchived = Boolean(searchParam.isArchived)
    const fromSaved = Boolean(searchParam.isSaved)
    let {data:symptom}=await api.get(`/symptoms/${p.id}`)
    return(
        <>
           <ChartDisplay symptom={symptom.data} fromArchived={fromArchived} fromSaved={fromSaved}/> 
        </>
    )
}