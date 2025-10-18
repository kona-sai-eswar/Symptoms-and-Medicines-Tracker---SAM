import api from "@/axios/api"
import SymptomsClient from "@/components/Symptoms/SymptomsClient"
// import dbConnection from "@/lib/dbConnect"
// import SymptomsModel from "@/models/Symptoms"
export const dynamic = "force-dynamic";

export default async function Archived(){

    const symptoms = await api.get("/symptoms")

    // console.log(symptoms.data.symptoms)
    // dbConnection()
    // const symptoms = await SymptomsModel.find({})
    // console.log("symptoms",symptoms)

    const archived=symptoms.data.symptoms.filter(sym=>sym.isArchived)

    return(
        <div className="m-4 flex flex-col gap-2">
             <h1 className="text-center text-4xl mb-2">Archived Symptoms</h1>

            {
                archived.length===0 ? <p className="text-center self-center text-red-500">No Active symptoms</p> : <SymptomsClient symptoms={archived} fromArchived={true}/>
            }           
        </div>
    )
}