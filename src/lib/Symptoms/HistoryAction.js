"use server"
import SymptomsModel from "@/models/Symptoms";
import { revalidatePath } from "next/cache";

export async function MoveToHistory(id){
    try{
        let res=await SymptomsModel.updateOne({_id:id},{$set:{isArchived:true, isSaved:false}})
        revalidatePath("/symptoms")
        revalidatePath("/symptoms/saved")
        revalidatePath("/symptoms/archived")
        return {success:true, data:res}
    }catch(err){
        console.log("Failed to update saved",err)
        return {success:false, error: "Error updating saved status"}
    }
}

export async function RestorefromHistory(id,moveToSaved){
    try{
        let res=await SymptomsModel.updateOne({_id:id},{$set:{isArchived:false, isSaved:moveToSaved}})
        revalidatePath("/symptoms")
        revalidatePath("/symptoms/saved")
        revalidatePath("/symptoms/archived")
        return {success:true, data:res}
    }catch(err){
        console.log("Failed to update saved",err)
        return {success:false, error: "Error updating saved status"}
    }
}