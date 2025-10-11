"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

const AddSymptomButton = () => {
  const router = useRouter()

  return (
    <button 
        onClick={() => router.push("/symptoms/add")}
        className="px-5 py-2 rounded-lg bg-blue-500 text-white font-medium cursor-pointer transition-transform transform hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >Add a Symptom</button>
  )
}

export default AddSymptomButton