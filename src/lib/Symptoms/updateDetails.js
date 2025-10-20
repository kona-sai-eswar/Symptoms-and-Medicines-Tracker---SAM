"use server";

import SymptomsModel from "@/models/Symptoms";
import { revalidatePath } from "next/cache";
import dbConnection from "../dbConnect";

export async function updateSeverity(symptomId, dateId, recordId, newSeverity) {
  try {
        await dbConnection()

    // Update nested record severity
    const result = await SymptomsModel.updateOne(
      { _id: symptomId, "severity._id": dateId, "severity.records._id": recordId },
      {
        $set: {
          "severity.$[dateElem].records.$[recordElem].severity": Number(newSeverity),
        },
      },
      {
        arrayFilters: [
          { "dateElem._id": dateId },
          { "recordElem._id": recordId },
        ],
      }
    );

    // Revalidate to refresh data
    revalidatePath("/symptom","layout");
    revalidatePath("/symptom/[id]")

    return { success: true, data: result };
  } catch (error) {
    console.error("Error updating severity:", error);
    return { success: false, error: error.message };
  }
}

export async function updateDescription(symptomId, dateId, recordId, newDes) {
  try {
        await dbConnection()

    // Update nested record description
    const result = await SymptomsModel.updateOne(
      { _id: symptomId, "severity._id": dateId, "severity.records._id": recordId },
      {
        $set: {
          "severity.$[dateElem].records.$[recordElem].description": newDes,
        },
      },
      {
        arrayFilters: [
          { "dateElem._id": dateId },
          { "recordElem._id": recordId },
        ],
      }
    );

    // Revalidate to refresh data
    revalidatePath("/symptom","layout");
    revalidatePath("/symptom/[id]")

    return { success: true, data: result };
  } catch (error) {
    console.error("Error updating description:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteRecord(symptomId, dateId, recordId) {
  try {
        await dbConnection()

    const result = await SymptomsModel.updateOne(
      { _id: symptomId, "severity._id": dateId},
      {
        $pull:{"severity.$.records": { _id: recordId }}
      }
    );

    // Revalidate to refresh data
    revalidatePath("/symptom","layout");
    revalidatePath("/symptom/[id]")

    return { success: true, data: result };
  } catch (error) {
    console.error("Error deleting record:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteDate(symptomId, dateId) {
  try {
        await dbConnection()

    const result = await SymptomsModel.updateOne(
      { _id: symptomId},
      {
        $pull:{"severity": { _id: dateId }}
      }
    );

    // Revalidate to refresh data
    revalidatePath("/","layout");

    return { success: true, data: result };
  } catch (error) {
    console.error("Error deleting record:", error);
    return { success: false, error: error.message };
  }
}
