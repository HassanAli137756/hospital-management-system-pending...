import React from 'react'

function Header(
{
    onClick=() => {}
}
) {
  return (
    <header className="h-[50px] sm:h-[50px] bg-white border-b border-gray-100 sticky top-0 z-50">

        <div className="h-full px-4 sm:px-7 lg:px-10 flex items-center justify-between">


          {/* ================= LEFT ================= */}

          <div className="flex items-center gap-3 shrink-0">

            {/* MOBILE MENU BUTTON */}

            <button
              type="button"
              onClick={() => onClick()}
              className="md:hidden w-10 h-10 rounded-xl
                         flex items-center justify-center
                         text-gray-600
                         hover:bg-emerald-50
                         hover:text-emerald-700
                         active:scale-95
                         transition-all"
              aria-label="Open navigation"
            >

              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M4 7h16M4 12h16M4 17h16"
                />
              </svg>

            </button>


            {/* LOGO */}

            <div className="flex items-center gap-3.5 shrink-0 cursor-pointer">

              <div
                className="w-10 h-10 rounded-[13px]
                           bg-emerald-700 text-white
                           flex items-center justify-center
                           shadow-[0_3px_10px_rgba(4,120,87,0.16)]"
              >

                <svg
                  className="w-[21px] h-[21px]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeWidth={2}
                    d="M12 5v14M5 12h14"
                  />
                </svg>

              </div>


              <div className="hidden sm:block">

                <h1 className="text-[17px] font-bold tracking-tight text-emerald-950 leading-none">
                  Altas Physiotherapy
                </h1>

                <p className="text-[9px] font-medium tracking-[0.16em] text-gray-400 mt-1.5">
                  CLINIC MANAGEMENT
                </p>

              </div>

            </div>

          </div>


          {/* ================= DESKTOP NAV ================= */}

          <nav className="hidden md:flex items-center gap-8">

            <div
              className="relative py-2 text-[13px] font-medium
                         text-emerald-700 cursor-pointer"
            >
              Home

              <span
                className="absolute left-1/2 -translate-x-1/2 -bottom-[3px]
                           w-5 h-0.5 rounded-full bg-emerald-600"
              />

            </div>


            <div
              className="py-2 text-[13px] font-medium
                         text-gray-500
                         hover:text-emerald-700
                         transition-colors cursor-pointer"
            >
              Contact Us
            </div>


            <div
              className="py-2 text-[13px] font-medium
                         text-gray-500
                         hover:text-emerald-700
                         transition-colors cursor-pointer"
            >
              About Us
            </div>

          </nav>


          {/* ================= LOGIN ================= */}

          <button
            type="button"
            className="group inline-flex items-center gap-2
                       px-3.5 sm:px-4 py-2.5 rounded-xl
                       bg-emerald-700 text-white
                       text-[13px] font-semibold
                       shadow-[0_3px_10px_rgba(4,120,87,0.14)]
                       hover:bg-emerald-800
                       active:scale-[0.97]
                       transition-all"
          >

            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeWidth={1.8}
                d="M15 3.5h4a1.5 1.5 0 011.5 1.5v14a1.5 1.5 0 01-1.5 1.5h-4M10 17l5-5-5-5M15 12H3.5"
              />
            </svg>

            <span className="hidden sm:inline">
              Login
            </span>

          </button>

        </div>

      </header>
  )
}

export default Header