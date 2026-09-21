import React, { useState } from "react";
import Header from "./Header";
import { GeneralHome } from "./GeneralHome";
import PatientHome from "../components/Patient/PatientHome";
import PatientAppointments from "../components/Patient/PatientAppointment";
import PatientHistory from "../components/Patient/PatientHistory";
import PatientPayments from "../components/Patient/PatientPayments";
import ReceptionistHome from "../components/GeneralComponents/GeneralHome";


const sidebarLinks = [
  {
    name: "Dashboard",
    active: true,
    icon: (
      <svg
        className="w-[19px] h-[19px]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M3.5 10.5L12 3l8.5 7.5M5.5 9.5V20a1 1 0 001 1h11a1 1 0 001-1V9.5M9 21v-6a1 1 0 011-1h4a1 1 0 011 1v6"
        />
      </svg>
    ),
  },

  {
    name: "Appointments",
    icon: (
      <svg
        className="w-[19px] h-[19px]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M8 3.5v3M16 3.5v3M4 9h16M6 5.5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2v-11a2 2 0 012-2z"
        />
      </svg>
    ),
  },

  {
    name: "Patients",
    icon: (
      <svg
        className="w-[19px] h-[19px]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M16.5 20.5v-1.2a4.3 4.3 0 00-4.3-4.3H7.3A4.3 4.3 0 003 19.3v1.2M9.7 10.7a3.7 3.7 0 100-7.4 3.7 3.7 0 000 7.4zM17 11a3 3 0 100-6M16.5 15h1.2a4.3 4.3 0 014.3 4.3v1.2"
        />
      </svg>
    ),
  },

  {
    name: "Doctors",
    icon: (
      <svg
        className="w-[19px] h-[19px]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 12.2a4.1 4.1 0 100-8.2 4.1 4.1 0 000 8.2zM4.5 21a7.5 7.5 0 0115 0M17.5 7v5M15 9.5h5"
        />
      </svg>
    ),
  },

  {
    name: "Payments",
    icon: (
      <svg
        className="w-[19px] h-[19px]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M3.5 8.5h17M5.5 5h13a2 2 0 012 2v10a2 2 0 01-2 2h-13a2 2 0 01-2-2V7a2 2 0 012-2zM7 14.5h3"
        />
      </svg>
    ),
  },
];

const password = "k#9!mX7$QzR4&pL9*vW2@tB6^yN1(uC8)mZ3_qA5+xK0=jF7~hD4[gE2]sP8{iO9}"

const GeneralDashboard = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };


  return (
    <div className="min-h-screen bg-[#f5f9f7] text-gray-800">


      {/* =====================================================
          HEADER
      ====================================================== */}

      <Header
      onClick={() => setIsMobileMenuOpen(prev => !prev)}
      />



      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      {isMobileMenuOpen && (
        <div
          onClick={closeMobileMenu}
          className="fixed inset-0 bg-gray-950/25 backdrop-blur-[1px]
                     z-60 md:hidden"
        />
      )}



      {/* =====================================================
          MOBILE SIDEBAR
      ====================================================== */}

      <aside
        className={`
          fixed left-0 top-0 bottom-0 z-70
          w-[280px] max-w-[82vw]
          bg-white
          shadow-[8px_0_30px_rgba(15,23,42,0.08)]
          flex flex-col
          md:hidden

          transform transition-transform duration-300 ease-out

          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >


        {/* Mobile Sidebar Header */}

        <div
          className="h-[68px] px-5
                     border-b border-gray-100
                     flex items-center justify-between"
        >

          <div className="flex items-center gap-3">

            <div
              className="w-9 h-9 rounded-xl
                         bg-emerald-700 text-white
                         flex items-center justify-center"
            >

              <svg
                className="w-[19px] h-[19px]"
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


            <div>

              <h2 className="text-[15px] font-bold text-emerald-950">
                CareFlow
              </h2>

              <p className="text-[9px] tracking-[0.14em] text-gray-400">
                CLINIC MANAGEMENT
              </p>

            </div>

          </div>


          {/* CLOSE BUTTON */}

          <button
            type="button"
            onClick={closeMobileMenu}
            className="w-9 h-9 rounded-xl
                       flex items-center justify-center
                       text-gray-500
                       hover:bg-gray-100
                       hover:text-gray-800
                       active:scale-95
                       transition-all"
            aria-label="Close navigation"
          >

            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeWidth={1.8}
                d="M6 6l12 12M18 6L6 18"
              />
            </svg>

          </button>

        </div>



        {/* Mobile Navigation */}

        <div className="flex-1 overflow-y-auto px-4 py-6">

          <p
            className="text-[10px] font-semibold uppercase
                       tracking-[0.15em] text-emerald-600
                       px-3 mb-3"
          >
            Clinic Portal
          </p>


          <nav className="space-y-1">

            {sidebarLinks.map((link) => (

              <div
                key={link.name}
                onClick={closeMobileMenu}
                className={`
                  group relative flex items-center gap-3
                  px-3.5 py-3 rounded-xl
                  text-[13px] font-medium
                  cursor-pointer
                  transition-all

                  ${
                    link.active
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-gray-500 hover:bg-gray-50 hover:text-emerald-700"
                  }
                `}
              >

                {link.active && (
                  <span
                    className="absolute left-0 top-1/2
                               -translate-y-1/2
                               w-[3px] h-6
                               rounded-r-full
                               bg-emerald-600"
                  />
                )}


                <span
                  className={
                    link.active
                      ? "text-emerald-600"
                      : "text-gray-400 group-hover:text-emerald-600"
                  }
                >
                  {link.icon}
                </span>


                <span>
                  {link.name}
                </span>

              </div>

            ))}

          </nav>

        </div>



        {/* Mobile Profile */}

        <div className="p-4 border-t border-gray-100">

          <div
            className="flex items-center gap-3
                       px-3 py-3 rounded-xl
                       hover:bg-gray-50
                       transition-colors cursor-pointer"
          >

            <div
              className="w-9 h-9 rounded-full
                         bg-emerald-50 text-emerald-700
                         flex items-center justify-center"
            >

              <svg
                className="w-[17px] h-[17px]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeWidth={1.8}
                  d="M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0"
                />
              </svg>

            </div>


            <div>

              <p className="text-[13px] font-semibold text-gray-700">
                My Profile
              </p>

              <p className="text-[11px] text-gray-400">
                Account settings
              </p>

            </div>

          </div>

        </div>

      </aside>



      {/* =====================================================
          MAIN LAYOUT
      ====================================================== */}

      <div className="flex min-h-[calc(100vh-68px)] sm:min-h-[calc(100vh-70px)]">


        {/* =====================================================
            DESKTOP SIDEBAR
        ====================================================== */}

        <aside
          className="hidden md:flex
                     w-[250px] lg:w-[265px]
                     bg-white border-r border-gray-100
                     flex-col shrink-0"
        >

          {/* Sidebar Intro */}

          <div className="px-5 lg:px-6 pt-7 pb-5">

            <p
              className="text-[10px] font-semibold uppercase
                         tracking-[0.15em] text-emerald-600"
            >
              Clinic Portal
            </p>

            <h2 className="text-[17px] font-semibold text-gray-800 mt-1">
              Management
            </h2>

            <p className="text-[11px] text-gray-400 mt-1">
              Manage your clinic with ease
            </p>

          </div>


          {/* Desktop Navigation */}

          <nav className="px-3 lg:px-4 space-y-1">

            {sidebarLinks.map((link) => (

              <div
                key={link.name}
                className={`
                  group relative flex items-center gap-3
                  px-3.5 py-3 rounded-xl
                  text-[13px] font-medium cursor-pointer
                  transition-all duration-200

                  ${
                    link.active
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-gray-500 hover:bg-gray-50 hover:text-emerald-700"
                  }
                `}
              >

                {link.active && (
                  <span
                    className="absolute left-0 top-1/2
                               -translate-y-1/2
                               w-[3px] h-6
                               rounded-r-full
                               bg-emerald-600"
                  />
                )}


                <span
                  className={
                    link.active
                      ? "text-emerald-600"
                      : "text-gray-400 group-hover:text-emerald-600"
                  }
                >
                  {link.icon}
                </span>


                <span>
                  {link.name}
                </span>

              </div>

            ))}

          </nav>


          {/* Desktop Profile */}

          <div className="mt-auto p-3 lg:p-4">

            <div className="border-t border-gray-100 pt-3">

              <div
                className="flex items-center gap-3
                           px-3 py-3 rounded-xl
                           hover:bg-gray-50
                           transition-colors cursor-pointer"
              >

                <div
                  className="w-9 h-9 rounded-full
                             bg-emerald-50 text-emerald-700
                             flex items-center justify-center
                             shrink-0"
                >

                  <svg
                    className="w-[17px] h-[17px]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeWidth={1.8}
                      d="M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0"
                    />
                  </svg>

                </div>


                <div className="min-w-0">

                  <p className="text-[13px] font-semibold text-gray-700 truncate">
                    My Profile
                  </p>

                  <p className="text-[11px] text-gray-400 truncate">
                    Account settings
                  </p>

                </div>

              </div>

            </div>

          </div>

        </aside>



        {/* ELEMENTS THROUGH OUTLET */}
        <main className="flex-1 min-w-0">
            <div className="p-4 sm:p-7 lg:p-9 xl:p-10">
                <ReceptionistHome />
            </div>
        </main>


      </div>

    </div>
  );
};


export { GeneralDashboard };
