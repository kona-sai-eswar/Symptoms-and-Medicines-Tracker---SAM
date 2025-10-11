"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"

export default function NavBar() {
  const path = usePathname()
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="fixed top-0 left-0 w-full h-[60px] bg-blue-500 text-white shadow-md z-50">
      <div className="relative max-w-7xl mx-auto h-full flex items-center px-6">
        {/* Logo / Title */}
        <Link
          href="/"
          className="text-xl font-semibold tracking-wide hover:text-blue-100 transition"
        >
          SAM
        </Link>

        {/* Centered Nav */}
        <nav
          ref={menuRef}
          className="absolute left-1/2 -translate-x-1/2 flex gap-6 text-sm font-medium"
        >
          {/* Home */}
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-md transition-colors ${
              path === "/"
                ? "bg-blue-700 text-white"
                : "text-blue-100 hover:bg-blue-600 hover:text-white"
            }`}
          >
            Home
          </Link>

          {/* Symptoms */}
          <div className="relative">
            <button
              onClick={(e)=>{setShowMenu(p=>!p)}}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                path.startsWith("/symptoms")
                  ? "bg-blue-700 text-white"
                  : "text-blue-100 hover:bg-blue-600 hover:text-white"
              }`}
            >
              Symptoms
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-30 bg-white text-gray-800 rounded-md shadow-lg"
              >
                <Link
                  href="/symptoms"
                  className="block px-4 py-2 hover:bg-blue-100"
                  onClick={() => setShowMenu(false)}
                >
                  All Symptoms
                </Link>
                <hr className="mx-2 text-blue-300" />
                <Link
                  href="/symptoms/add"
                  className="block px-4 py-2 hover:bg-blue-100"
                  onClick={() => setShowMenu(false)}
                >
                  Add New
                </Link>
                <hr className="mx-2 text-blue-300" />
                <Link
                  href="/symptoms/saved"
                  className="block px-4 py-2 hover:bg-blue-100"
                  onClick={() => setShowMenu(false)}
                >
                  Saved
                </Link>
                <hr className="mx-2 text-blue-300" />
                <Link
                  href="/symptoms/archived"
                  className="block px-4 py-2 hover:bg-blue-100"
                  onClick={() => setShowMenu(false)}
                >
                  Archived
                </Link>
              </div>
            )}
          </div>

          {/* Future Medicines Link */}
          <Link
            href="/medicines"
            className={`px-3 py-1.5 rounded-md transition-colors ${
              path.startsWith("/medicines")
                ? "bg-blue-700 text-white"
                : "text-blue-100 hover:bg-blue-600 hover:text-white"
            }`}
          >
            Medicines
          </Link>
        </nav>
      </div>
    </header>
  )
}
