"use client";

import { CircleArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import SevPerSymptom from "./SevPerSymptom";
import { useState } from "react";
import DaysDropdown from "./DaysDropdown";
import SevPerDay from "./SevPerDay";

export default function ChartDisplay({ symptom }) {
  const router = useRouter();
  const [selectedDays, setSelectedDays] = useState([]);

  return (
    <>
      <button
        onClick={() => {
          router.push(`/symptoms/${symptom._id}`);
        }}
        className="flex items-center mt-3 text-gray-700 hover:text-blue-600 cursor-pointer"
      >
        <CircleArrowLeft className="w-6 h-6" />
      </button>
      <div>
        <h1 className="text-center text-2xl font-semibold mt-4 mb-2 text-blue-500">
          {symptom.name} trends
        </h1>
        <SevPerSymptom symptom={symptom}/>
        <div className="flex flex-col justify-center items-center m-4 gap-3">
        <p className="text-center">Check you per day trends</p>
        <DaysDropdown days={symptom.severity}
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}/>
          </div>
          <div className={`grid grid-cols-1 sm:${selectedDays.length===1?"grid-cols-1":"grid-cols-2"}`}>
          {
            selectedDays.length>0 && symptom.severity.filter(day=>selectedDays.includes(day.date)).map(day=>{return <div key={day._id}><p className="text-center">on {day.date}</p><SevPerDay records={day.records} /></div>})
          }
          </div>
      </div>
    </>
  );
}
