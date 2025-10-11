"use server"

import SymptomsModel from "@/models/Symptoms"
import { revalidatePath } from "next/cache"

export default async function deleteSymptom(id){
    try{
        await SymptomsModel.findByIdAndDelete({_id:id})
        revalidatePath("/symptoms")
        return {success:true}
    }catch(error){
        console.error("Failed to delete symptom:", error);
        return { success: false, error: "Error deleting symptom" };
    }
}