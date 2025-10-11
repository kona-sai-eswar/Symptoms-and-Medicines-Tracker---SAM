import api from "@/axios/api"
import ChartDisplay from "@/components/Symptoms/Charts/ChartDisplay"

export default async function Chart({params}){
    const p = await params
    let {data:symptom}=await api.get(`/symptoms/${p.id}`)
    return(
        <>
           <ChartDisplay symptom={symptom.data}/> 
        </>
    )
}