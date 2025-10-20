import dbConnection from "@/lib/dbConnect";
import SymptomsModel from "@/models/Symptoms";
import { NextResponse } from "next/server";
export async function GET(req,{params}){
    dbConnection()
    
    const p = await params;
    try{
        const id =  p.id
        let data = await SymptomsModel.findById({_id:id})
        return NextResponse.json({data},{status:200})
    }catch(err){
        return NextResponse.json({message:"Error", err},{status:500})
    }
}

export async function PUT(req, {params}){
    dbConnection()
    
    const p = await params;
    try{
        const id= p.id
        const newSym =await req.json()
        let data = await SymptomsModel.findByIdAndUpdate(id,newSym,{new:true})
        return NextResponse.json({data},{status:200})
    }catch(err){
        return NextResponse.json({message:"Error", err},{status:500})
    }
}

export async function DELETE(req,{params}){
    dbConnection()
    
    const p = await params;
    try{
        let id = await p.id
        let data = await SymptomsModel.findByIdAndDelete({_id:id})
        return NextResponse.json({message:"deleted succesfully"},{status:200})
    }catch(err){
        return NextResponse.json({message:"Error", err},{status:500})
    }
}