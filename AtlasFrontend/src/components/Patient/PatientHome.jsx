import React from 'react'

import {
  CalendarDays,
  Clock3,
  Stethoscope,
  ClipboardList,
  CreditCard,
  ArrowRight,
  Plus,
  CheckCircle2,
  CircleDollarSign,
} from "lucide-react";

export default function PatientHome() {
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

        <p className="mt-2 text-sm text-gray-500">
          Here’s a quick overview of your clinic activities.
        </p>
      </section>


      {/* =====================================================
          TODAY'S APPOINTMENT
      ====================================================== */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Section Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
              <CalendarDays
                size={19}
                className="text-emerald-700"
              />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                Today&apos;s Appointment
              </h2>

              <p className="text-xs text-gray-400 mt-0.5">
                Your appointment for today
              </p>
            </div>

          </div>


          {/* Appointment Status */}
          <span className="
            inline-flex items-center gap-1.5
            px-2.5 py-1.5
            rounded-full
            bg-emerald-50
            text-emerald-700
            text-xs font-semibold
          ">
            <CheckCircle2 size={14} />
            Confirmed
          </span>

        </div>


        {/* Appointment Body */}
        <div className="p-5 sm:p-6">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            {/* Doctor */}
            <div className="flex items-center gap-4">

              <div className="
                w-14 h-14
                shrink-0
                rounded-2xl
                bg-emerald-50
                border border-emerald-100
                flex items-center justify-center
              ">
                <Stethoscope
                  size={25}
                  className="text-emerald-700"
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Doctor
                </p>

                <h3 className="mt-1 text-lg font-semibold text-gray-900">
                  Dr. Doctor Name
                </h3>

                <p className="text-sm text-gray-500 mt-0.5">
                  Physiotherapist
                </p>
              </div>

            </div>


            {/* Appointment Details */}
            <div className="flex flex-wrap items-center gap-3">

              <div className="
                flex items-center gap-2
                px-3.5 py-2.5
                rounded-xl
                bg-gray-50
                border border-gray-100
              ">
                <Clock3
                  size={17}
                  className="text-emerald-700"
                />

                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                    Time
                  </p>

                  <p className="text-sm font-semibold text-gray-800">
                    05:00 PM
                  </p>
                </div>
              </div>


              <div className="
                flex items-center gap-2
                px-3.5 py-2.5
                rounded-xl
                bg-gray-50
                border border-gray-100
              ">
                <CalendarDays
                  size={17}
                  className="text-emerald-700"
                />

                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                    Date
                  </p>

                  <p className="text-sm font-semibold text-gray-800">
                    Today
                  </p>
                </div>
              </div>

            </div>

          </div>


          {/* Bottom Appointment Info */}
          <div className="
            mt-6
            pt-5
            border-t border-gray-100
            flex flex-col sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
          ">

            <div>
              <p className="text-xs text-gray-400">
                Appointment Type
              </p>

              <p className="text-sm font-medium text-gray-800 mt-1">
                Physiotherapy Session
              </p>
            </div>


            <button
              type="button"
              className="
                inline-flex items-center justify-center gap-2
                px-4 py-2.5
                rounded-xl
                border border-gray-200
                bg-white
                text-sm font-medium
                text-gray-700
                hover:bg-gray-50
                hover:border-emerald-200
                hover:text-emerald-700
                transition
              "
            >
              View Appointment
              <ArrowRight size={16} />
            </button>

          </div>

        </div>

      </section>


      {/* =====================================================
          SUMMARY CARDS
      ====================================================== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* Total Sessions */}
        <div className="
          bg-white
          rounded-2xl
          border border-gray-100
          shadow-sm
          p-5
        ">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Sessions
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                24
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Sessions completed
              </p>
            </div>

            <div className="
              w-11 h-11
              rounded-xl
              bg-emerald-50
              flex items-center justify-center
            ">
              <ClipboardList
                size={21}
                className="text-emerald-700"
              />
            </div>

          </div>

        </div>


        {/* Pending Appointments */}
        <div className="
          bg-white
          rounded-2xl
          border border-gray-100
          shadow-sm
          p-5
        ">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Pending Appointments
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                2
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Awaiting appointment
              </p>
            </div>

            <div className="
              w-11 h-11
              rounded-xl
              bg-amber-50
              flex items-center justify-center
            ">
              <CalendarDays
                size={21}
                className="text-amber-600"
              />
            </div>

          </div>

        </div>


        {/* Paid Payments */}
        <div className="
          bg-white
          rounded-2xl
          border border-gray-100
          shadow-sm
          p-5
        ">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Paid Payments
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                Rs. 18,500
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Total paid amount
              </p>
            </div>

            <div className="
              w-11 h-11
              rounded-xl
              bg-blue-50
              flex items-center justify-center
            ">
              <CircleDollarSign
                size={21}
                className="text-blue-600"
              />
            </div>

          </div>

        </div>


        {/* Pending Payments */}
        <div className="
          bg-white
          rounded-2xl
          border border-gray-100
          shadow-sm
          p-5
        ">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Pending Payments
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                Rs. 3,000
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Amount remaining
              </p>
            </div>

            <div className="
              w-11 h-11
              rounded-xl
              bg-red-50
              flex items-center justify-center
            ">
              <CreditCard
                size={21}
                className="text-red-500"
              />
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BOOK APPOINTMENT
      ====================================================== */}
      <section className="
        bg-white
        rounded-2xl
        border border-gray-100
        shadow-sm
        p-5 sm:p-6
      ">

        <div className="
          flex flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-5
        ">

          <div className="flex items-center gap-4">

            <div className="
              w-12 h-12
              shrink-0
              rounded-xl
              bg-emerald-50
              flex items-center justify-center
            ">
              <CalendarDays
                size={23}
                className="text-emerald-700"
              />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                Need another appointment?
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Choose an available doctor and appointment time.
              </p>
            </div>

          </div>


          {/* Booking Button */}
          <button
            type="button"
            className="
              inline-flex items-center justify-center gap-2
              px-5 py-3
              rounded-xl
              bg-emerald-700
              text-white
              text-sm font-semibold
              shadow-sm
              hover:bg-emerald-800
              active:bg-emerald-900
              active:scale-[0.98]
              focus:outline-none
              focus:ring-2
              focus:ring-emerald-200
              transition
            "
          >
            <Plus size={18} />
            Book Appointment
          </button>

        </div>

      </section>

    </div>
  );
}
