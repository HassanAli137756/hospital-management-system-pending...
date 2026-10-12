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
    weeklySessions=[]
}
) 
{
  return (
    <section className="mt-8">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            This Week
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your sessions and appointments for the current week.
          </p>
        </div>

        <span className="hidden text-xs font-medium text-gray-400 sm:block">
          {weeklySessions.length} appointments
        </span>
      </div>

      <div className="space-y-4">
        {weeklySessions.length > 0 ? weeklySessions.map((session) => (
          <div
            key={session.id}
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
                    {session.treatment}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {session.doctor}
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
                      {session.date}
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
                      {session.time}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                <CheckCircle2 size={15} />
                {session.status}
              </div>

              
            </div>
          </div>
        )):
        <div>
            <p>There is no session in this week</p>
        </div>
    
    }
      </div>
    </section>
  )
}

export default DoneAppointmentCards