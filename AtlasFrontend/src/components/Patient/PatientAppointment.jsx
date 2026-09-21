
import {
  CalendarDays,
  Clock3,
  Stethoscope,
  ChevronRight,
  Plus,
  CheckCircle2,
  Clock4,
  XCircle,
  UserRound,
  ArrowRight,
} from "lucide-react";
import React from "react";

const appointmentTabs = [
  "Upcoming",
  "Pending",
  "Completed",
];

const appointments = [
  {
    id: 1,
    doctor: "Dr. Ahmed Khan",
    service: "Physiotherapy",
    date: "October 03, 2026",
    time: "05:00 PM",
    status: "Confirmed",
  },
  {
    id: 2,
    doctor: "Dr. Muhammad Ali",
    service: "Cupping Therapy",
    date: "October 07, 2026",
    time: "06:30 PM",
    status: "Confirmed",
  },
];

export default function PatientAppointments() {
  return (
    <div className="space-y-6">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}
      <section className="
        flex flex-col
        sm:flex-row
        sm:items-center
        sm:justify-between
        gap-4
      ">

        <div>
          <p className="text-sm font-medium text-emerald-700">
            Appointments
          </p>

          <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900">
            My Appointments
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            View your appointments or book a new visit with a doctor.
          </p>
        </div>


        {/* Booking Button */}
        <button
          type="button"
          className="
            inline-flex items-center justify-center gap-2
            px-4 py-2.5
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

      </section>


      {/* =====================================================
          APPOINTMENT TABS
      ====================================================== */}
      <section className="
        bg-white
        border border-gray-100
        rounded-2xl
        shadow-sm
        p-2
      ">

        <div className="
          flex
          gap-1
          overflow-x-auto
          scrollbar-none
        ">

          {appointmentTabs.map((tab, index) => (
            <button
              key={tab}
              type="button"
              className={`
                shrink-0
                px-4 py-2.5
                rounded-xl
                text-sm font-medium
                transition
                ${
                  index === 0
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }
              `}
            >
              {tab}
            </button>
          ))}

        </div>

      </section>


      {/* =====================================================
          UPCOMING APPOINTMENTS
      ====================================================== */}
      <section>

        <div className="flex items-center justify-between mb-4">

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Upcoming Appointments
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Your scheduled clinic visits.
            </p>
          </div>

          <span className="
            hidden sm:inline-flex
            items-center
            px-2.5 py-1
            rounded-full
            bg-emerald-50
            text-emerald-700
            text-xs font-semibold
          ">
            {appointments.length} Appointments
          </span>

        </div>


        {/* Appointment List */}
        <div className="space-y-4">

          {appointments.map((appointment) => (

            <div
              key={appointment.id}
              className="
                bg-white
                rounded-2xl
                border border-gray-100
                shadow-sm
                p-5
                sm:p-6
                hover:border-emerald-100
                transition
              "
            >

              <div className="
                flex flex-col
                lg:flex-row
                lg:items-center
                lg:justify-between
                gap-5
              ">

                {/* Doctor */}
                <div className="flex items-center gap-4">

                  <div className="
                    w-12 h-12
                    shrink-0
                    rounded-xl
                    bg-emerald-50
                    flex items-center justify-center
                  ">
                    <Stethoscope
                      size={22}
                      className="text-emerald-700"
                      strokeWidth={1.8}
                    />
                  </div>

                  <div className="min-w-0">

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="
                        font-semibold
                        text-gray-900
                      ">
                        {appointment.doctor}
                      </h3>

                      <span className="
                        inline-flex items-center gap-1
                        px-2 py-0.5
                        rounded-full
                        bg-emerald-50
                        text-emerald-700
                        text-[11px]
                        font-semibold
                      ">
                        <CheckCircle2 size={12} />
                        {appointment.status}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                      {appointment.service}
                    </p>

                  </div>

                </div>


                {/* Date / Time */}
                <div className="
                  flex flex-wrap
                  items-center
                  gap-3
                ">

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
                      <p className="
                        text-[10px]
                        uppercase
                        tracking-wide
                        text-gray-400
                      ">
                        Date
                      </p>

                      <p className="text-sm font-semibold text-gray-800">
                        {appointment.date}
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
                    <Clock3
                      size={17}
                      className="text-emerald-700"
                    />

                    <div>
                      <p className="
                        text-[10px]
                        uppercase
                        tracking-wide
                        text-gray-400
                      ">
                        Time
                      </p>

                      <p className="text-sm font-semibold text-gray-800">
                        {appointment.time}
                      </p>
                    </div>
                  </div>

                </div>


                {/* Details */}
                <button
                  type="button"
                  className="
                    inline-flex items-center justify-center gap-2
                    px-4 py-2.5
                    rounded-xl
                    border border-gray-200
                    text-sm font-medium
                    text-gray-700
                    hover:border-emerald-200
                    hover:bg-emerald-50
                    hover:text-emerald-700
                    transition
                  "
                >
                  Details
                  <ChevronRight size={16} />
                </button>

              </div>


              {/* Appointment Bottom */}
              <div className="
                mt-5
                pt-4
                border-t border-gray-100
                flex flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-3
              ">

                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock4 size={14} />
                  Please arrive a few minutes before your appointment.
                </div>

                <button
                  type="button"
                  className="
                    text-sm
                    font-medium
                    text-red-500
                    hover:text-red-600
                  "
                >
                  Cancel Appointment
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* =====================================================
          BOOK NEW APPOINTMENT
      ====================================================== */}
      <section className="
        bg-white
        rounded-2xl
        border border-gray-100
        shadow-sm
        overflow-hidden
      ">



      </section>

    </div>
  );
}
