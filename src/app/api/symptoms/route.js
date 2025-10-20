import dbConnection from "@/lib/dbConnect";
import SymptomsModel from "@/models/Symptoms";
import { NextResponse } from "next/server";

export async function GET(req){
    dbConnection()

    try{
        const symptoms  = await SymptomsModel.find({})
        return NextResponse.json({ symptoms }, {status:200})
    }catch(err){
        return NextResponse.json({message:"Error", err},{status:500})
    }
}