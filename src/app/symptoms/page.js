import api from "@/axios/api"
import AddSymptomButton from "@/components/Symptoms/AddSymptomButton"
import SymptomsClient from "@/components/Symptoms/SymptomsClient"
// import dbConnection from "@/lib/dbConnect"
// import SymptomsModel from "@/models/Symptoms"
export const dynamic = "force-dynamic";

export default async function Symptoms(){

    const symptoms = await api.get("/symptoms")

    // console.log(symptoms.data.symptoms)
    // dbConnection()
    // const symptoms = await SymptomsModel.find({})
    // console.log("symptoms",symptoms)

    const activeSym=symptoms.data.symptoms.filter(sym=>!sym.isArchived)

    return(
        <div className="m-4 flex flex-col gap-2">
            <h1 className="text-center text-4xl">Your Symptoms</h1>
            
            <div className="mb-5 ml-2 mt-5 flex flex-col justify-center items-center">
                <AddSymptomButton />
            </div>

            {
                activeSym.length===0 ? <p className="text-center self-center text-red-500">No Active symptoms</p> : <SymptomsClient symptoms={activeSym}/>
            }
        </div>
    )
}