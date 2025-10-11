"use client"
import { useState, useRef, useEffect } from "react";

export default function DaysDropdown({ days, selectedDays, setSelectedDays }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className="px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
        onClick={() => setOpen(!open)}
      >
        Select Days ▾
      </button>

      {open && (
        <div
        className="absolute left-0 mt-2 w-38 max-h-[200px] overflow-y-auto bg-white border rounded-lg shadow-lg z-50"
      >
        <div className="flex flex-col p-2">
          {days.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-2">No days</p>
          ) : (
            days.map((day) => (
              <label
                key={day.date}
                className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-50 rounded"
              >
                <input
                  type="checkbox"
                  checked={selectedDays.includes(day.date)}
                  onChange={() => toggleDay(day.date)}
                />
                <span>{day.date}</span>
              </label>
            ))
          )}
        </div>
      </div>
      
      )}
    </div>
  );
}
