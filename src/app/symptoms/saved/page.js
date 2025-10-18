import api from "@/axios/api"
import SymptomsClient from "@/components/Symptoms/SymptomsClient"

export const dynamic = "force-dynamic";

export default async function Saved(){
    const symptoms = await api.get("/symptoms")

    // console.log(symptoms.data.symptoms)
    let saved = symptoms.data.symptoms.filter(sym=>sym.isSaved)

    return(
        <div className="m-4 flex flex-col gap-2">
            
            <h1 className="text-center text-4xl mb-2">Saved Symptoms</h1>

            {
                saved.length===0 ? <p className="text-center self-center text-red-500">No Active symptoms</p> : <SymptomsClient symptoms={saved} fromSaved={true}/>
            }
        </div>
    )
}