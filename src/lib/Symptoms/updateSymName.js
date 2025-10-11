"use server"
import SymptomsModel from "@/models/Symptoms"
import { revalidatePath } from "next/cache"

export default async function updateSymNamefn(id, newname){
    try{
        // let data=await SymptomsModel.updateOne({_id:id}, {$set:{name:newname}})
        let data = await SymptomsModel.findByIdAndUpdate(id,{name:newname},{new:true})
        const plainData = JSON.parse(JSON.stringify(data));
        console.log("from server", id,newname,data)
        revalidatePath("/symptom","layout")
        return {plainData, success:true}
    }catch(error){
        console.error("Failed to update symptom:", error);
        return { success: false, error: "Error updating symptom" };
    }
}