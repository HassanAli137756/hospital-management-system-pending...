import React from "react";
import {
CheckCircle2,
Clock3,
CreditCard,
CalendarDays,
UserRound,
ArrowRight,
WalletCards,
} from "lucide-react";

const PatientPayments = () => {
const summaryCards = [
{
title: "Total Paid",
value: "Rs. 18,500",
description: "Total amount paid",
icon: CheckCircle2,
},
{
title: "Pending Payment",
value: "Rs. 3,000",
description: "Amount currently due",
icon: Clock3,
},
{
title: "Total Sessions",
value: "24",
description: "Sessions completed",
icon: WalletCards,
},
];

const pendingSessions = [
{
id: 1,
doctor: "Dr. Ahmed Khan",
treatment: "Physiotherapy",
date: "Oct 03, 2026",
time: "05:00 PM",
amount: "Rs. 1,500",
},
{
id: 2,
doctor: "Dr. Muhammad Ali",
treatment: "Cupping Therapy",
date: "Oct 07, 2026",
time: "06:30 PM",
amount: "Rs. 1,500",
},
];

return ( <div className="min-h-full bg-gray-50/70 p-4 sm:p-6 lg:p-8"> <div className="mx-auto max-w-7xl space-y-6">

```
    {/* Page Header */}
    <div>
      <p className="mb-1 text-sm font-medium text-emerald-600">
        Financial Overview
      </p>

      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        Payments
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Keep track of your session payments and outstanding dues.
      </p>
    </div>

    {/* Summary Cards */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {summaryCards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  {card.value}
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  {card.description}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-100">
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {/* Pending Sessions */}
    <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* Section Header */}
      <div className="flex flex-col gap-2 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-emerald-600" />

            <h2 className="text-lg font-bold text-gray-900">
              Pending Payments
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Sessions for which payment is still pending.
          </p>
        </div>

        <span className="w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
          {pendingSessions.length} Pending
        </span>
      </div>

      {/* Pending Session Cards */}
      <div className="grid grid-cols-1 gap-4 p-5 ">
        {pendingSessions.map((session) => (
          <div
            key={session.id}
            className="rounded-2xl border border-gray-300 bg-gray-50/50 p-5 transition duration-200 hover:border-emerald-300  hover:shadow-sm"
          >
            {/* Top */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <UserRound className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {session.doctor}
                  </h3>

                  <p className="mt-0.5 text-sm text-gray-500">
                    {session.treatment}
                  </p>
                </div>
              </div>

              <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                Pending
              </span>
            </div>

            {/* Session Information */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-gray-100 bg-white p-3">
                <div className="flex items-center gap-2 text-gray-400">
                  <CalendarDays className="h-4 w-4" />

                  <span className="text-xs">
                    Date
                  </span>
                </div>

                <p className="mt-1.5 text-sm font-semibold text-gray-700">
                  {session.date}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-3">
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock3 className="h-4 w-4" />

                  <span className="text-xs">
                    Time
                  </span>
                </div>

                <p className="mt-1.5 text-sm font-semibold text-gray-700">
                  {session.time}
                </p>
              </div>
            </div>

            {/* Bottom */}
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
              <div>
                <p className="text-xs text-gray-400">
                  Amount Due
                </p>

                <p className="mt-0.5 text-lg font-bold text-gray-900">
                  {session.amount}
                </p>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-white px-3.5 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 active:scale-[0.98]"
              >
                View Details
                <ArrowRight className="h-4 w-4" />
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

export default PatientPayments;
