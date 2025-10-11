"use client";
import { useRouter } from "next/navigation";
import { CircleArrowLeft } from "lucide-react";

import SymptomsForm from "@/components/Symptoms/SymptomsForm";

export default function AddSymptom() {
  const router = useRouter();

  return (
    <div className="mt-2">
        <div className="relative flex items-center w-full">
          <button
            onClick={() => router.back()}
            className="absolute left-0 flex items-center text-gray-700 hover:text-blue-600 cursor-pointer"
          >
            <CircleArrowLeft className="w-6 h-6" />
          </button>

          <h2 className="mx-auto text-blue-500 text-2xl font-semibold">Add your Symptom</h2>
        </div>

        <SymptomsForm />
      </div>
  );
}
