"use server"
import SymptomsModel from "@/models/Symptoms";
import { revalidatePath } from "next/cache";
import dbConnection from "../dbConnect";

export async function addToSaved(id){
    try{
            await dbConnection()

        let res=await SymptomsModel.updateOne({_id:id},{$set:{isSaved:true}})
        revalidatePath("/symptoms")
        revalidatePath("/symptoms/saved")
        return {success:true, data:res}
    }catch(err){
        console.log("Failed to update saved",err)
        return {success:false, error: "Error updating saved status"}
    }
}

export async function removeFromSaved(id){
    try{
            await dbConnection()

        let res=await SymptomsModel.updateOne({_id:id},{$set:{isSaved:false}})
        revalidatePath("/symptoms")
        revalidatePath("/symptoms/saved")
        return {success:true, data:res}
    }catch(err){
        console.log("Failed to update saved",err)
        return {success:false, error: "Error updating saved status"}
    }
}