import React from "react";
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

const PatientHistory = () => {
const summaryCards = [
{
title: "Total Sessions",
value: "24",
subtitle: "All-time treatment sessions",
icon: Activity,
},
{
title: "Sessions This Month",
value: "6",
subtitle: "Sessions in October",
icon: CalendarDays,
},
];

const weeklySessions = [
{
id: 1,
doctor: "Dr. Ahmed Khan",
treatment: "Physiotherapy",
date: "Thursday, Oct 01",
time: "05:00 PM",
status: "Completed",
},
{
id: 2,
doctor: "Dr. Muhammad Ali",
treatment: "Cupping Therapy",
date: "Friday, Oct 02",
time: "06:30 PM",
status: "Completed",
},
{
id: 3,
doctor: "Dr. Usman",
treatment: "Dry Needling",
date: "Saturday, Oct 03",
time: "04:30 PM",
status: "Upcoming",
},
];

return ( <div className="min-h-full bg-[#f4f8f6] px-4 py-6 sm:px-6 lg:px-8"> <div className="mx-auto max-w-7xl">

    {/* Page Header */}
    <div className="mb-8">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        My History
      </h1>

      <p className="mt-1.5 text-sm text-gray-500">
        View your treatment sessions and appointment history.
      </p>
    </div>

    {/* Quick Summary */}
    <section>
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-900">
          Quick Summary
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          A quick overview of your treatment sessions.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {card.title}
                  </p>

                  <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
                    {card.value}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {card.subtitle}
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Icon size={21} strokeWidth={1.8} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>

    {/* Advanced Search Navigation */}
    <section className="mt-7">
      <button
        type="button"

        // Later:
        // navigate("/patient/history/search")

        className="group w-full rounded-2xl border border-emerald-100 bg-white p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md sm:p-6"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Search size={22} strokeWidth={1.8} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-gray-900">
                  Search Appointment History
                </h2>

                <span className="hidden rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 sm:inline-flex">
                  Advanced Search
                </span>
              </div>

              <p className="mt-1.5 max-w-2xl text-sm leading-6 text-gray-500">
                Find a specific appointment or treatment session using
                detailed search and filter options.
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                <span className="inline-flex items-center gap-1">
                  <SlidersHorizontal size={13} />
                  Multiple filters
                </span>

                <span>•</span>

                <span>Doctor</span>
                <span>•</span>
                <span>Date</span>
                <span>•</span>
                <span>Session</span>
                <span>•</span>
                <span>Payment</span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 text-sm font-semibold text-emerald-600">
            Open Search
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </div>
        </div>
      </button>
    </section>

    {/* This Week */}
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
        {weeklySessions.map((session) => (
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

              <button
                type="button"
                className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
              >
                View Details
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>

  </div>
</div>

);
};

export default PatientHistory;
