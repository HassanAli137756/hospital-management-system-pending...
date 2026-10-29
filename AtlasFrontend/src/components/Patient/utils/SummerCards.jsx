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
function SummerCards(
{
    doneSessions=
    {
      allowed:false,
      value:0
    },
    pendingSessions=
    {
      allowed:false,
      value:0
    },
    paidPayment=
    {
      allowed:false,
      value:0
    },
    pendingPayment=
    {
      allowed:false,
      value:0
    },
    classes="",
    isAllowedDefaultClasses=true

}
) {
  return (
    <section className={`${isAllowedDefaultClasses ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4": ""} ${classes}`}>

        {/* Total Sessions */}
        {
          doneSessions.allowed &&
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
                {doneSessions.value}
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
        }


        {/* Pending Appointments */}
        {
          pendingSessions.allowed &&
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
                {pendingSessions.value}
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
        }


        {/* Paid Payments */}
        {
          paidPayment.allowed &&
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
                Rs. {Number(paidPayment.value).toLocaleString()}
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
        }


        {/* Pending Payments */}
        {
          pendingPayment.allowed &&
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
                Rs. {Number(pendingPayment.value).toLocaleString()}
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
        }

      </section>

  )
}

export {SummerCards}