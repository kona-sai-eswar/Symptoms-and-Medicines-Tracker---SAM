import dbConnection from "@/lib/dbConnect";
import SymptomsModel from "@/models/Symptoms";
import { NextResponse } from "next/server";

dbConnection()
export async function GET(req){
    try{
        const symptoms  = await SymptomsModel.find({})
        return NextResponse.json({ symptoms }, {status:200})
    }catch(err){
        return NextResponse.json({message:"Error", err},{status:500})
    }
}