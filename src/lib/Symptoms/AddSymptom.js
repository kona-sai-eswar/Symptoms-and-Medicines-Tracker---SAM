"use server";

import SymptomsModel from "@/models/Symptoms";
import dbConnection from "../dbConnect";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {getDateParts} from "../today";

export async function addSymptom(prevState, formData) {
  
    await dbConnection();

    // Extract and trim data
    const name = formData.get("name")?.trim() || "";
    const description = formData.get("description")?.trim() || "";
    const severityRaw = formData.get("severity");
    const severityValue = severityRaw ? parseInt(severityRaw) : null;

    // Initialize validation message state
    const message = { name: "", description: "", severity: "" };
    let isValid = true;

    if (!name) {
      message.name = "Please fill your symptom name.";
      isValid = false;
    }

    if (!description) {
      message.description = "Please add details about your symptom.";
      isValid = false;
    }

    if (severityValue === null || isNaN(severityValue)) {
      message.severity = "Select severity of your symptom.";
      isValid = false;
    }

    if (!isValid) {
      return { success: false, message };
    }

    // Prepare date and time
    const now = new Date();

    const { display: date } = getDateParts(now, "Asia/Kolkata");

    const time = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }).format(now);

      const newSymptom = {
        name,
        severity: [
          {
            date,
            records: [{ time, severity: severityValue, description
            }],
          },
        ],
      };

      const data = await SymptomsModel.create(newSymptom);
      console.log("✅ New symptom created:", newSymptom);

      revalidatePath("/symptoms")

      // return ({message: {
      //   success: true,
      //   symptom: data, name: "", description: "", severity: "" }});

      redirect(`/symptoms/${data._id}`)
}