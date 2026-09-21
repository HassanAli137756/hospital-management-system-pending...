

import {
  CalendarDays,
  Clock3,
  Stethoscope,
  ArrowRight,
  ClipboardList,
  CreditCard,
  UserRound,
  Phone,
} from "lucide-react";
import React from "react";

function GeneralHome() {
  return (
    <div className="space-y-6">

      {/* =====================================================
          WELCOME
      ====================================================== */}
      <section>
        <p className="text-sm font-medium text-emerald-700">
          Welcome back
        </p>

        <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900">
          Hello, Patient Name
        </h1>

        <p className="mt-2 text-sm text-gray-500 max-w-2xl">
          Keep track of your appointments, treatment sessions and
          payments from your patient portal.
        </p>
      </section>


      {/* =====================================================
          NEXT APPOINTMENT
      ====================================================== */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        <div className="p-5 sm:p-6">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            {/* Appointment Info */}
            <div className="flex items-start gap-4">

              <div className="w-12 h-12 shrink-0 rounded-xl bg-emerald-50 flex items-center justify-center">
                <CalendarDays
                  size={23}
                  className="text-emerald-700"
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Your next appointment
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-900">
                  Physiotherapy Session
                </h2>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">

                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={15} />
                    September 30, 2026
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Clock3 size={15} />
                    05:00 PM
                  </span>

                </div>
              </div>

            </div>


            {/* Status */}
            <div className="flex items-center gap-3">

              <span className="
                inline-flex items-center
                px-3 py-1.5
                rounded-full
                bg-emerald-50
                text-emerald-700
                text-xs font-semibold
              ">
                Confirmed
              </span>

              <button
                type="button"
                className="
                  inline-flex items-center gap-2
                  px-4 py-2.5
                  rounded-xl
                  bg-emerald-700
                  text-white
                  text-sm font-medium
                  hover:bg-emerald-800
                  active:bg-emerald-900
                  transition
                "
              >
                View Details
                <ArrowRight size={16} />
              </button>

            </div>

          </div>


          {/* Doctor */}
          <div className="mt-5 pt-5 border-t border-gray-100 flex items-center justify-between gap-4">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Stethoscope
                  size={18}
                  className="text-gray-500"
                />
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Doctor
                </p>

                <p className="text-sm font-semibold text-gray-800">
                  Dr. Doctor Name
                </p>
              </div>

            </div>

            <span className="text-xs text-gray-400">
              Clinic Appointment
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          QUICK ACTIONS
      ====================================================== */}
      <section>

        <div className="flex items-center justify-between mb-4">

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Quick Actions
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Manage your clinic visits easily.
            </p>
          </div>

        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Book Appointment */}
          <button
            type="button"
            className="
              group
              text-left
              bg-white
              border border-gray-100
              rounded-2xl
              p-5
              shadow-sm
              hover:border-emerald-200
              hover:shadow-md
              transition
            "
          >

            <div className="flex items-center justify-between">

              <div className="
                w-10 h-10
                rounded-xl
                bg-emerald-50
                flex items-center justify-center
              ">
                <CalendarDays
                  size={20}
                  className="text-emerald-700"
                />
              </div>

              <ArrowRight
                size={18}
                className="
                  text-gray-300
                  group-hover:text-emerald-600
                  group-hover:translate-x-1
                  transition
                "
              />

            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              Book an Appointment
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Choose a doctor and available appointment time.
            </p>

          </button>


          {/* My Sessions */}
          <button
            type="button"
            className="
              group
              text-left
              bg-white
              border border-gray-100
              rounded-2xl
              p-5
              shadow-sm
              hover:border-emerald-200
              hover:shadow-md
              transition
            "
          >

            <div className="flex items-center justify-between">

              <div className="
                w-10 h-10
                rounded-xl
                bg-blue-50
                flex items-center justify-center
              ">
                <ClipboardList
                  size={20}
                  className="text-blue-600"
                />
              </div>

              <ArrowRight
                size={18}
                className="
                  text-gray-300
                  group-hover:text-emerald-600
                  group-hover:translate-x-1
                  transition
                "
              />

            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              My Sessions
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              View your treatment and session history.
            </p>

          </button>


          {/* Payments */}
          <button
            type="button"
            className="
              group
              text-left
              bg-white
              border border-gray-100
              rounded-2xl
              p-5
              shadow-sm
              hover:border-emerald-200
              hover:shadow-md
              transition
            "
          >

            <div className="flex items-center justify-between">

              <div className="
                w-10 h-10
                rounded-xl
                bg-amber-50
                flex items-center justify-center
              ">
                <CreditCard
                  size={20}
                  className="text-amber-600"
                />
              </div>

              <ArrowRight
                size={18}
                className="
                  text-gray-300
                  group-hover:text-emerald-600
                  group-hover:translate-x-1
                  transition
                "
              />

            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              Payments
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Check your payment and billing history.
            </p>

          </button>

        </div>

      </section>


      {/* =====================================================
          LOWER SECTION
      ====================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.65fr] gap-5">


        {/* Recent Sessions */}
        <div className="
          bg-white
          rounded-2xl
          border border-gray-100
          shadow-sm
          p-5 sm:p-6
        ">

          <div className="flex items-center justify-between mb-5">

            <div>
              <h2 className="font-semibold text-gray-900">
                Recent Sessions
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Your latest treatment activity.
              </p>
            </div>

            <button
              type="button"
              className="
                text-sm
                font-medium
                text-emerald-700
                hover:text-emerald-800
              "
            >
              View All
            </button>

          </div>


          {/* Session */}
          <div className="
            flex items-center gap-4
            py-4
            border-b border-gray-100
          ">

            <div className="
              w-10 h-10
              rounded-xl
              bg-emerald-50
              flex items-center justify-center
            ">
              <ClipboardList
                size={18}
                className="text-emerald-700"
              />
            </div>

            <div className="flex-1 min-w-0">

              <p className="font-medium text-gray-800">
                Physiotherapy
              </p>

              <p className="text-xs text-gray-400 mt-1">
                September 25, 2026 · Dr. Doctor Name
              </p>

            </div>

            <span className="
              hidden sm:inline-flex
              px-2.5 py-1
              rounded-full
              bg-gray-50
              text-gray-500
              text-xs
            ">
              Completed
            </span>

          </div>


          {/* Second Session */}
          <div className="flex items-center gap-4 py-4">

            <div className="
              w-10 h-10
              rounded-xl
              bg-emerald-50
              flex items-center justify-center
            ">
              <ClipboardList
                size={18}
                className="text-emerald-700"
              />
            </div>

            <div className="flex-1 min-w-0">

              <p className="font-medium text-gray-800">
                Cupping Therapy
              </p>

              <p className="text-xs text-gray-400 mt-1">
                September 20, 2026 · Dr. Doctor Name
              </p>

            </div>

            <span className="
              hidden sm:inline-flex
              px-2.5 py-1
              rounded-full
              bg-gray-50
              text-gray-500
              text-xs
            ">
              Completed
            </span>

          </div>

        </div>


        {/* Patient Information */}
        <div className="
          bg-white
          rounded-2xl
          border border-gray-100
          shadow-sm
          p-5 sm:p-6
        ">

          <div className="flex items-center gap-3 mb-5">

            <div className="
              w-10 h-10
              rounded-xl
              bg-emerald-50
              flex items-center justify-center
            ">
              <UserRound
                size={19}
                className="text-emerald-700"
              />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                My Information
              </h2>

              <p className="text-xs text-gray-400 mt-1">
                Your basic account information
              </p>
            </div>

          </div>


          <div className="space-y-4">

            <div>
              <p className="text-xs text-gray-400">
                Full Name
              </p>

              <p className="text-sm font-medium text-gray-800 mt-1">
                Patient Name
              </p>
            </div>


            <div>
              <p className="text-xs text-gray-400">
                Email
              </p>

              <p className="text-sm font-medium text-gray-800 mt-1 break-all">
                patient@example.com
              </p>
            </div>


            <div>
              <p className="text-xs text-gray-400">
                Contact Number
              </p>

              <p className="text-sm font-medium text-gray-800 mt-1 flex items-center gap-2">
                <Phone size={14} className="text-gray-400" />
                +92 XXX XXXXXXX
              </p>
            </div>

          </div>


          <button
            type="button"
            className="
              mt-5
              w-full
              px-4 py-2.5
              rounded-xl
              border border-gray-200
              text-sm font-medium
              text-gray-700
              hover:bg-gray-50
              hover:border-gray-300
              transition
            "
          >
            View Profile
          </button>

        </div>

      </section>

    </div>
  );
}


export {GeneralHome}