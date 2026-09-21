import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-[#f4f8f7] text-slate-800">

      {/* ================= HEADER ================= */}
      <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6">

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
            C
          </div>

          <div>
            <h1 className="font-semibold text-slate-900 leading-none">
              CareFlow
            </h1>
            <p className="text-[11px] text-slate-400 mt-1">
              Clinic Management
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5">

          <button className="relative text-slate-500 hover:text-slate-800">
            <span className="text-xl">🔔</span>
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white" />
          </button>

          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-semibold">
              HA
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-medium text-slate-800">
                Hassan Ali
              </p>
              <p className="text-xs text-slate-400">
                Administrator
              </p>
            </div>
          </div>

        </div>
      </header>


      {/* ================= MAIN LAYOUT ================= */}
      <div className="flex min-h-[calc(100vh-64px)]">

        {/* ================= SIDEBAR ================= */}
        <aside className="hidden lg:block w-64 border-r border-slate-200 bg-white p-4">

          <div className="mb-7 px-3">
            <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
              Main Menu
            </p>
          </div>

          <nav className="space-y-1">

            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-medium">
              <span>▦</span>
              Dashboard
            </div>

            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50">
              <span>📅</span>
              Appointments
            </div>

            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50">
              <span>👤</span>
              Patients
            </div>

            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50">
              <span>🩺</span>
              Doctors
            </div>

            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50">
              <span>💳</span>
              Payments
            </div>

          </nav>


          <div className="mt-8 mb-3 px-3">
            <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
              Management
            </p>
          </div>

          <nav className="space-y-1">

            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50">
              <span>📊</span>
              Reports
            </div>

            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50">
              <span>⚙</span>
              Settings
            </div>

          </nav>


          {/* Small clinic status card */}
          <div className="mt-10 rounded-2xl bg-slate-900 p-4 text-white">

            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="text-xs text-slate-300">
                Clinic Status
              </span>
            </div>

            <p className="mt-3 text-sm font-medium">
              Clinic is operating
            </p>

            <p className="text-xs text-slate-400 mt-1">
              9:00 AM — 9:00 PM
            </p>

          </div>

        </aside>


        {/* ================= CONTENT ================= */}
        <main className="flex-1 p-5 sm:p-7 overflow-hidden">

          {/* Page heading */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">

            <div>
              <p className="text-sm text-slate-400">
                Tuesday, September 22, 2026
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Good morning, Hassan
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Here's what's happening at your clinic today.
              </p>
            </div>

            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-sm">
              + New Appointment
            </button>

          </div>


          {/* ================= STAT CARDS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

            {/* Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-slate-400">
                    Today's Appointments
                  </p>

                  <h3 className="text-2xl font-bold text-slate-900 mt-2">
                    24
                  </h3>
                </div>

                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  📅
                </div>

              </div>

              <p className="text-xs text-emerald-600 mt-4">
                ↑ 12% from yesterday
              </p>

            </div>


            <div className="bg-white border border-slate-200 rounded-2xl p-5">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-slate-400">
                    Total Patients
                  </p>

                  <h3 className="text-2xl font-bold text-slate-900 mt-2">
                    1,284
                  </h3>
                </div>

                <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  👥
                </div>

              </div>

              <p className="text-xs text-blue-600 mt-4">
                18 new this month
              </p>

            </div>


            <div className="bg-white border border-slate-200 rounded-2xl p-5">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-slate-400">
                    Completed Sessions
                  </p>

                  <h3 className="text-2xl font-bold text-slate-900 mt-2">
                    19
                  </h3>
                </div>

                <div className="h-10 w-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                  ✓
                </div>

              </div>

              <p className="text-xs text-violet-600 mt-4">
                79% of today's bookings
              </p>

            </div>


            <div className="bg-white border border-slate-200 rounded-2xl p-5">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-slate-400">
                    Today's Revenue
                  </p>

                  <h3 className="text-2xl font-bold text-slate-900 mt-2">
                    Rs. 18,500
                  </h3>
                </div>

                <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  ₨
                </div>

              </div>

              <p className="text-xs text-amber-600 mt-4">
                8 payments received
              </p>

            </div>

          </div>


          {/* ================= LOWER GRID ================= */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">


            {/* ================= APPOINTMENTS ================= */}
            <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl">

              <div className="flex items-center justify-between p-5 border-b border-slate-100">

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Today's Appointments
                  </h3>

                  <p className="text-xs text-slate-400 mt-1">
                    Upcoming patient appointments
                  </p>
                </div>

                <button className="text-sm text-emerald-600 font-medium">
                  View all
                </button>

              </div>


              <div className="divide-y divide-slate-100">

                {/* Appointment */}
                <div className="p-5 flex items-center justify-between gap-4">

                  <div className="flex items-center gap-3">

                    <div className="h-11 w-11 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-semibold">
                      AM
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Ali Muhammad
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        Physiotherapy • Dr. Ahmed
                      </p>
                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-sm font-semibold text-slate-800">
                      10:30 AM
                    </p>

                    <span className="inline-block mt-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700">
                      Confirmed
                    </span>

                  </div>

                </div>


                <div className="p-5 flex items-center justify-between gap-4">

                  <div className="flex items-center gap-3">

                    <div className="h-11 w-11 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-semibold">
                      SK
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Sana Khan
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        Back Pain • Dr. Hamza
                      </p>
                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-sm font-semibold text-slate-800">
                      11:00 AM
                    </p>

                    <span className="inline-block mt-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700">
                      Pending
                    </span>

                  </div>

                </div>


                <div className="p-5 flex items-center justify-between gap-4">

                  <div className="flex items-center gap-3">

                    <div className="h-11 w-11 rounded-full bg-violet-50 text-violet-700 flex items-center justify-center font-semibold">
                      UA
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Usman Ahmed
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        Knee Injury • Dr. Ahmed
                      </p>
                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-sm font-semibold text-slate-800">
                      12:30 PM
                    </p>

                    <span className="inline-block mt-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700">
                      Confirmed
                    </span>

                  </div>

                </div>


                <div className="p-5 flex items-center justify-between gap-4">

                  <div className="flex items-center gap-3">

                    <div className="h-11 w-11 rounded-full bg-rose-50 text-rose-700 flex items-center justify-center font-semibold">
                      HR
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Hamza Raza
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        Shoulder Pain • Dr. Hamza
                      </p>
                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-sm font-semibold text-slate-800">
                      02:00 PM
                    </p>

                    <span className="inline-block mt-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-500">
                      Waiting
                    </span>

                  </div>

                </div>

              </div>

            </div>


            {/* ================= DOCTORS ================= */}
            <div className="bg-white border border-slate-200 rounded-2xl">

              <div className="p-5 border-b border-slate-100">

                <h3 className="font-semibold text-slate-900">
                  Doctors
                </h3>

                <p className="text-xs text-slate-400 mt-1">
                  Today's availability
                </p>

              </div>


              <div className="p-5 space-y-5">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-semibold">
                      DA
                    </div>

                    <div>
                      <p className="text-sm font-medium">
                        Dr. Ahmed
                      </p>

                      <p className="text-xs text-slate-400">
                        Physiotherapist
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-xs text-emerald-600">
                      On duty
                    </span>
                  </div>

                </div>


                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
                      DH
                    </div>

                    <div>
                      <p className="text-sm font-medium">
                        Dr. Hamza
                      </p>

                      <p className="text-xs text-slate-400">
                        Physiotherapist
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-xs text-emerald-600">
                      On duty
                    </span>
                  </div>

                </div>


                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="h-10 w-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-semibold">
                      DK
                    </div>

                    <div>
                      <p className="text-sm font-medium">
                        Dr. Kamran
                      </p>

                      <p className="text-xs text-slate-400">
                        Physiotherapist
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-slate-300" />
                    <span className="text-xs text-slate-400">
                      Off duty
                    </span>
                  </div>

                </div>


                {/* Quick action */}
                <button className="w-full mt-2 border border-slate-200 hover:bg-slate-50 rounded-xl py-2.5 text-sm font-medium text-slate-600">
                  Manage Doctors
                </button>

              </div>

            </div>

          </div>


          {/* ================= BOTTOM INFO ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <p className="text-xs text-slate-400">
                Pending Payments
              </p>
              <p className="text-xl font-bold text-slate-900 mt-2">
                Rs. 7,800
              </p>
              <p className="text-xs text-amber-600 mt-2">
                From 6 patients
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <p className="text-xs text-slate-400">
                Sessions This Month
              </p>
              <p className="text-xl font-bold text-slate-900 mt-2">
                486
              </p>
              <p className="text-xs text-emerald-600 mt-2">
                ↑ 8.4% compared to last month
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <p className="text-xs text-slate-400">
                Clinic Capacity
              </p>
              <p className="text-xl font-bold text-slate-900 mt-2">
                76%
              </p>

              <div className="h-2 bg-slate-100 rounded-full mt-3 overflow-hidden">
                <div className="h-full w-[76%] bg-emerald-500 rounded-full" />
              </div>
            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default App;