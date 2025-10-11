import api from "@/axios/api"
import SymptomsCard from "@/components/Symptoms/SymptomsCard"
export const dynamic = "force-dynamic";

export default async function Saved(){
    const symptoms = await api.get("/symptoms")

    // console.log(symptoms.data.symptoms)
    let saved = symptoms.data.symptoms.filter(sym=>sym.isSaved)

    return(
        <div className="m-4 flex flex-col gap-2">
            {saved.length===0 ? <p className="text-center">No  Saved Symptoms</p> :<><h1 className="text-center text-4xl">Your Symptoms</h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {   
                    
                    saved.toReversed().map(sym=>{
                        return <SymptomsCard symptom={sym} key={sym._id} fromSaved={true}/>
                    })
                }
            </div></>}
        </div>
    )
}