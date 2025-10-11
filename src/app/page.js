import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans m-0 min-h-screen flex flex-col items-center justify-between text-gray-800 px-6 py-10">
      {/* Header Section */}
      <div className="max-w-4xl text-center">
        <h1 className="font-extrabold text-blue-500 text-4xl mb-4">
          Symptoms &amp; Medicines Tracker - SAM
        </h1>

        <h2 className="text-2xl font-semibold mt-6 mb-2">
          Welcome to Your Personal Health Tracker
        </h2>
        <p className="text-lg leading-relaxed">
          Keeping track of your symptoms and medications has never been easier.
          Whether you’re managing chronic conditions or just monitoring your
          well-being, our app helps you record every detail in one convenient
          place. With a few clicks, you can log how you’re feeling today or add
          new symptoms and medications to your personalized health record.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">
          Stay On Top of Your Health
        </h2>
        <p className="text-lg leading-relaxed">
          Understanding your health trends is key to making informed decisions.
          Our app lets you check your symptom and medication history at any
          time, so you can spot patterns, track improvements, or notice changes
          that may need attention. Your data is organized by day, making it easy
          to review and reflect on your health journey.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">
          Quick, Simple, and Reliable
        </h2>
        <p className="text-lg leading-relaxed">
          Logging symptoms or medications takes only a few seconds. With
          intuitive buttons for each action—whether it’s adding a new entry,
          logging what’s happening now, or reviewing past records—you’ll spend
          less time managing data and more time focusing on your health.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">
          Your Health, Your Control
        </h2>
        <p className="text-lg leading-relaxed mb-10">
          Empower yourself with actionable insights. By keeping your symptom and
          medication history up to date, you’ll have a clear picture of your
          health over time. Start tracking today and take control of your
          well-being, one entry at a time.
        </p>
      </div>

      {/* Buttons Section */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* Column 1: Symptoms */}
        <div className="flex flex-col gap-4">
          <Link
            href="/symptoms"
            className="bg-blue-500 text-white py-2 px-6 rounded-lg text-center font-semibold hover:bg-blue-600 transition"
          >
            View Symptoms
          </Link>
          <Link
            href="/symptoms/add"
            className="bg-green-500 text-white py-2 px-6 rounded-lg text-center font-semibold hover:bg-green-600 transition"
          >
            Add Symptom
          </Link>
          <Link
            href="/symptoms/archived"
            className="bg-blue-500 text-white py-2 px-6 rounded-lg text-center font-semibold hover:bg-blue-600 transition"
          >
            Symptom History
          </Link>
        </div>

        {/* Column 2: Medicines */}
        <div className="flex flex-col gap-4">
          <Link
            href="/medicines"
            className="bg-green-500 text-white py-2 px-6 rounded-lg text-center font-semibold hover:bg-green-600 transition"
          >
            view Medicines
          </Link>
          <Link
            href="/medicines/add"
            className="bg-blue-500 text-white py-2 px-6 rounded-lg text-center font-semibold hover:bg-blue-600 transition"
          >
            Add Medicine
          </Link>
          <Link
            href="/medicines/archived"
            className="bg-green-500 text-white py-2 px-6 rounded-lg text-center font-semibold hover:bg-green-600 transition"
          >
            Medicine History
          </Link>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <footer className="mt-12 text-center text-sm text-gray-500 max-w-2xl">
        <p>
          <strong>Disclaimer:</strong> This is a personal project for tracking
          general symptoms and medications. It is not a substitute for
          professional medical advice, diagnosis, or treatment. Always consult a
          qualified healthcare provider regarding any medical concerns.
        </p>
      </footer>
    </div>
  );
}
