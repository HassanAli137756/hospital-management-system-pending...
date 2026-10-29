import React from 'react'
import {
  Activity,
  CalendarDays,
  Search,
  Clock3,
  Stethoscope,
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";

function DoneAppointmentCards(
  {
    sessionCards = []
  }
) {
  return (
    <section className="mt-8 bg-white rounded-2xl border border-gray-200 p-5 border-b-gray-300">
      <div className="mb-4 flex items-end justify-between gap-4 ">
        <div className=" ">
          <h2 className="text-base font-semibold text-gray-900">
            Your Done Sessoins
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your all done sessions and appointments.
          </p>
        </div>

        <span className="
                  inline-flex items-center gap-1.5
                  px-2.5 py-1.5
                  rounded-full
                  bg-emerald-50
                  text-emerald-700
                  text-xs font-semibold
                ">
          <CheckCircle2 size={14} />
          {sessionCards.length} Appointments
        </span>
      </div>

      <div className="space-y-4">
        {sessionCards.length > 0 ? sessionCards.map((session) => (
          <div
            key={session._id}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-emerald-100 hover:shadow-md sm:p-6"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              {/* Doctor / Treatment */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Stethoscope size={21} strokeWidth={1.8} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {session.forSession?.slice(0, 1)?.toUpperCase() + session?.forSession?.slice(1, session?.forSession?.length)}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {session.doctor.fullName}
                  </p>
                </div>
              </div>

              {/* Date / Time */}
              <div className="flex flex-wrap gap-x-6 gap-y-3 sm:justify-end">
                <div className="flex items-center gap-2">
                  <CalendarDays
                    size={17}
                    className="text-emerald-600"
                  />

                  <div>
                    <p className="text-xs text-gray-400">
                      Date
                    </p>

                    <p className="text-sm font-medium text-gray-700">
                      {new Date(session.times?.date).toLocaleDateString("en-US", { dateStyle: "medium" })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock3
                    size={17}
                    className="text-emerald-600"
                  />

                  <div>
                    <p className="text-xs text-gray-400">
                      Time
                    </p>

                    <p className="text-sm font-medium text-gray-700">
                      {session.times?.time}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                <CheckCircle2 size={15} />
                Done
              </div>


            </div>
          </div>
        )) :
          <div>
            <p>There is no session yet</p>
          </div>

        }
      </div>
    </section>
  )
}

export { DoneAppointmentCards }