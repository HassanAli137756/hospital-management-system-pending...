import {
  CheckCircle2,
  Clock3,
  CreditCard,
  CalendarDays,
  UserRound,
  ArrowRight,
  WalletCards,
} from "lucide-react";
import React from 'react'

function PendingPaymentCards(
{
    pendingSessions=[]
}
) {
    return (
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
       <div className="grid grid-cols-1 gap-4 p-5 ">
        {pendingSessions.length > 0 ? pendingSessions.map((session) => (
          <div
            key={session._id}
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
                    {session.doctor?.fullName}
                  </h3>

                  <p className="mt-0.5 text-sm text-gray-500">
                    {session.forSession?.slice(0, 1)?.toUpperCase() + session?.forSession?.slice(1, session?.forSession?.length) }
                  </p>
                </div>
              </div>

              <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                Pending
              </span>
            </div>

            {/* Session Information */}
            <div className="flex justify-end">
                <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-gray-100 bg-white p-3">
                <div className="flex items-center gap-2 text-gray-400">
                  <CalendarDays className="h-4 w-4" />

                  <span className="text-xs">
                    Date
                  </span>
                </div>

                <p className="mt-1.5 text-sm font-semibold text-gray-700">
                  {new Date(session.times?.date).toLocaleDateString("en-US", {weekday: "short", month: "short", year: "2-digit", day: "numeric"})}
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
                  {session.times?.time}
                </p>
              </div>
            </div>
            </div>

            {/* Bottom */}
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
              <div>
                <p className="text-xs text-gray-400">
                  Amount Due
                </p>

                        <p className="mt-0.5 text-lg font-bold text-gray-900">
                            {session?.paymentSection?.payable}
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
        )) :
        <p className='font-semibold'>
            There is no pending payment
        </p>
        }
      </div>
    </section>

    )
}

export {PendingPaymentCards}