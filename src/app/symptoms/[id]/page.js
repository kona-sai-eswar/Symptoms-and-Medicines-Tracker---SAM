"use client";
import api from "@/axios/api";
import SymptomDetailCard from "@/components/Symptoms/SymptomDetailsCard";
import { getDateParts } from "@/lib/today";
// import deleteSymptom from "@/lib/Symptoms/deleteSymptom";
import { ChartLine, CircleArrowLeft, PlusCircle, Trash2, XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";

export default function SymptomID({ params }) {
  const searchParams = useSearchParams()
  const fromArchived = Boolean(searchParams.get("isArchived"))
  const fromSaved = Boolean(searchParams.get("isSaved"))
  let [symptom, setSymptom] = useState();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [update, setUpdate] = useState(false);
  const [newSev, setNewSev] = useState("");
  const [newdesc, setNewDesc] = useState("");
  const [newErr, setNewErr] = useState({ sev: "", des: "" });
  const [refetchData, setRefetchData] = useState(false);

  const router = useRouter();
  const { id } = React.use(params);

  useEffect(() => {
    async function fetchSymptom(id) {
      try {
        const rep = await api.get(`/symptoms/${id}`);
        const data = rep.data.data;
        setSymptom(data);
      } catch (err) {
        console.error("Failed to fetch symptom:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSymptom(id);
  }, [id, refetchData]);

  async function handleUpdate(e) {
    e.preventDefault();
    let isValid = true;
    setNewErr({ sev: "", des: "" });

    if (newSev.trim() === "") {
      setNewErr((p) => ({ ...p, sev: "update severity" }));
      isValid = false;
    }
    if (newdesc.trim() === "") {
      setNewErr((p) => ({ ...p, des: "Add description" }));
      isValid = false;
    }

    if (isValid) {
      setSubmitting(true)
      // const now = new Date();
      // let retrivedDate = now.toLocaleDateString(undefined, {
      //   year: "numeric",
      //   day: "2-digit",
      //   month: "2-digit",
      // });
      // let [day, month, year] = retrivedDate.split("/");
      const { display: date } = getDateParts(new Date(), "Asia/Kolkata"); // -> "2025-10-11"
      // console.log("now",now,"retrivedDate",retrivedDate,"day",day,"month",month,"year",year,"date",date)
      const time = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }).format(new Date());

      let newSymptom = JSON.parse(JSON.stringify(symptom));
      let dateIndex = newSymptom.severity.findIndex((d) => d.date === date);
      if (dateIndex >= 0) {
        newSymptom.severity[dateIndex].records.push({
          time,
          severity: newSev,
          description: newdesc,
        });
      } else {
        newSymptom.severity.push({
          date,
          records: [{ time, severity: newSev, description: newdesc }],
        });
      }
      console.log(newSymptom)
      const resp = await api.put(`/symptoms/${id}`, newSymptom);
      console.log("✅ Updated successfully:", resp.data);
      const updated = await api.get(`/symptoms/${id}`);
      setSymptom(updated.data.data);
      setNewSev("");
      setNewDesc("");
      setUpdate((p) => !p);
      setSubmitting(false)
    }
  }

  //   async function handleSymDelete(id) {
  //     let res;
  //     if (confirm("Are you sure you want to delete this symptom?"))
  //       res = await deleteSymptom(id);
  //     if (res.success) {
  //       router.push("/symptoms");
  //     } else {
  //       alert("Failed to delete symptom");
  //     }
  //   }

  if (loading) return <div className="flex justify-center items-center">Loading...</div>;

  if (!symptom) return <div className="flex justify-center items-center">No data found for this symptom</div>;

  return (
    <>
      <button
        onClick={() => {
          if (fromArchived) router.push("/symptoms/archived");
          else if (fromSaved) router.push("/symptoms/saved");
          else router.push("/symptoms");
        }}
        className="flex items-center mt-3 text-gray-700 hover:text-blue-600 cursor-pointer"
      >
        <CircleArrowLeft className="w-6 h-6" />
      </button>

      <div className="flex flex-col justify-center items-center gap-4">
        {/* <button onClick={() => handleSymDelete(symptom._id)} className="cursor-pointer hover:text-blue-500">
        <Trash2 size={15}/>
      </button> */}
        <div className="flex gap-2">
          <div className="text-center text-3xl text-blue-500">
            {symptom.name}
          </div>
          {symptom.severity.length > 0 &&
            symptom.severity.some((day) => day.records.length > 0) && (
              <button
                className="cursor-pointer"
                onClick={() => {
                  if(fromArchived) {router.push(`/symptoms/${id}/trends?isArchived=true`)}
                  else if(fromSaved) {router.push(`/symptoms/${id}/trends?isSaved=true`)}
                  else {router.push(`/symptoms/${id}/trends`)}
                }}
              >
                <ChartLine size={20} />
              </button>
            )}
        </div>
        {fromArchived ? (
          <p>Archived</p>
        ) : (
          <div className="flex gap-2 items-center">
            <h2 className="text-lg font-medium text-gray-700">
              Add a New Severity
            </h2>
            <button
              onClick={() => {
                setUpdate((p) => !p);
                setNewErr({ sev: "", des: "" });
              }}
              className="cursor-pointer hover:scale-110 transition-transform duration-200"
            >
              {!update ? (
                <PlusCircle size={18} className="text-green-500" />
              ) : (
                <XCircle size={18} className="text-red-500" />
              )}
            </button>
          </div>
        )}
      </div>

      {update && (
        <div className="flex justify-center items-center mt-2">
          <form
            onSubmit={handleUpdate}
            className="flex flex-col justify-center items-center gap-3 border-gray-500 rounded shadow-xl inset-shadow-xs p-6"
          >
            <div className="flex gap-1.5 items-baseline">
              <label>Select Severity</label>

              <select
                value={newSev}
                onChange={(e) => {
                  setNewSev(e.target.value);
                  setNewErr((p) => ({ ...p, sev: "" }));
                }}
                className="border rounded p-1"
              >
                <option value="">Select</option>
                {Array.from({ length: 5 }, (_, i) => i + 1).map((sev) => (
                  <option key={sev}>{sev}</option>
                ))}
              </select>
            </div>

            {newErr.sev.length > 0 && (
              <p className="text-red-500">{newErr.sev}</p>
            )}

            <div className="flex flex-col gap-1.5">
              <label>Update about your Severity</label>
              <textarea
                type="text"
                value={newdesc}
                onChange={(e) => {
                  setNewDesc(e.target.value);
                  setNewErr((p) => ({ ...p, des: "" }));
                }}
                className="border rounded p-2 outline-none focus:border-blue-500  focus:shadow-blue-500/30 focus:ring-blue-500 focus:caret-blue-500"
              />
            </div>

            {newErr.des.length > 0 && (
              <p className="text-red-500">{newErr.des}</p>
            )}
            <div className="flex justify-center items-center gap-2">
              <button
                type="submit"
                //   className="border bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={newErr.sev !== "" || newErr.des !== "" || submitting}
                className="border rounded p-1 text-white bg-blue-500 cursor-pointer hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setUpdate((p) => !p);
                  setNewSev("");
                  setNewDesc("");
                  setNewErr({ sev: "", des: "" });
                }}
                className="border rounded p-1 text-white bg-blue-500 cursor-pointer hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}

      {symptom?.severity?.length > 0 ? (
        <div className="flex flex-col w-full h-[300px] my-2">
          {symptom?.severity?.toReversed().map((date, index) => {
            return (
              <div key={date?._id}>
                {date.records.length > 0 && (
                  <div className="m-2 border-gray-500 rounded shadow-xl inset-shadow-xs p-6">
                    <SymptomDetailCard
                      date={date}
                      id={symptom._id}
                      symptom={symptom}
                      setRefetchData={setRefetchData}
                      setSymptom={setSymptom}
                      fromArchived={fromArchived}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-red-500 text-center mt-6">No Records</p>
      )}
    </>
  );
}
