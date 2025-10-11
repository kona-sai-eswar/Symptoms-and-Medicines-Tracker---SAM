import api from "@/axios/api"
import AddSymptomButton from "@/components/Symptoms/AddSymptomButton"
import SymptomsCard from "@/components/Symptoms/SymptomsCard"
// import dbConnection from "@/lib/dbConnect"
// import SymptomsModel from "@/models/Symptoms"
export const dynamic = "force-dynamic";

export default async function Symptoms(){

    const symptoms = await api.get("/symptoms")

    console.log(symptoms.data.symptoms)
    // dbConnection()
    // const symptoms = await SymptomsModel.find({})
    // console.log("symptoms",symptoms)

    return(
        <div className="m-4 flex flex-col gap-2">
            <h1 className="text-center text-4xl">Your Symptoms</h1>
            
            <div className="mb-5 ml-2 mt-5 flex flex-col justify-center items-center">
                <AddSymptomButton />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {   
                    symptoms.data.symptoms.filter(sym=>!sym.isArchived).length<0 ? <p className="text-center">No Symptoms logged yet</p> :
                    symptoms.data.symptoms.filter(sym=>!sym.isArchived).toReversed().map(sym=>{
                        return <SymptomsCard symptom={sym} key={sym._id}/>
                    })
                }
            </div>
        </div>
    )
}