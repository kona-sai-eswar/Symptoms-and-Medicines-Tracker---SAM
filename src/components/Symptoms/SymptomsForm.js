import { addSymptom } from "@/lib/Symptoms/AddSymptom";
import { useActionState, useState } from "react";

export default function SymptomsForm() {
  const [state, formAction, isPending] = useActionState(addSymptom, {
    message: { name: "", description: "", severity: "" },
  });
  console.log(state)
  const [data, setData] = useState({name: "", description: "", severity: ""})
  function handleData(e){
    setData(p=>({...p, [e.target.name]:e.target.value}))
  }
  return (
    <div className="my-4 border-gray-500 rounded shadow-xl inset-shadow-xs p-4">
      <form
        action={formAction}
        className="flex flex-col justify-center items-center gap-6 p-4"
      >
        <div className="flex flex-col gap-2 text-center">
          <label htmlFor="name">Symptom</label>
          <input
            value={data.name}
            onChange={(e)=>{handleData(e); state.message.name=""}}
            id="name"
            placeholder="Enter your Symptom"
            name="name"
            type="text"
            className="border rounded p-2 outline-none focus:border-blue-500  focus:shadow-blue-500/30 focus:ring-blue-500 focus:caret-blue-500" 
          />
        </div>

        {state.message.name && (
          <p className="text-red-500">{state.message.name}</p>
        )}

        <div className="flex flex-col gap-2 text-center">
          <label htmlFor="des">Add details about your Symptoms</label>
          <textarea 
          value={data.description}
          onChange={(e)=>{handleData(e); state.message.description=""}}
          id="des" 
          name="description" 
          type="text"
          placeholder="Enter about your condition"
          className="border rounded p-2 outline-none focus:border-blue-500  focus:shadow-blue-500/30 focus:ring-blue-500 focus:caret-blue-500" 
          />
        </div>

        {state.message.description && (
          <p className="text-red-500">{state.message.description}</p>
        )}

        <div className="flex flex-col gap-2 text-center">
          <label htmlFor="sev">Select Severity</label>
          <select id="sev" value={data.severity} onChange={(e)=>{handleData(e); state.message.severity=""}} name="severity" className="border rounded p-2">
            <option value="">Select</option>
            {Array.from({ length: 5 }, (_, i) => i + 1).map((sev) => (
              <option key={sev}>{sev}</option>
            ))}
          </select>
        </div>

        {state.message.severity && (
          <p className="text-red-500">{state.message.severity}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="border rounded p-1 text-white bg-blue-500 cursor-pointer w-[130px] hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Submitting" : "Submit"}
        </button>
      </form>
    </div>
  );
}
