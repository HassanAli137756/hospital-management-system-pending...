
import {
  CalendarDays,
  Clock3,
  CreditCard,
  CircleDollarSign,
  Plus,
  Search,
  ArrowRight,
  UserRoundCheck,
  Stethoscope,
  CheckCircle2,
} from "lucide-react";
import React from "react";


function AppointmentCard({ appointment }) {
  const isConfirmed = appointment.status === "Confirmed";
  const isPaid = appointment.payment === "Paid";

  return (
    <div className="group p-5 transition duration-200 hover:bg-gray-50/60">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* ================= PATIENT ================= */}
        <div className="flex min-w-0 items-center gap-3">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-100">
            <UserRoundCheck className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-gray-900">
              {appointment.patient}
            </h3>

            <p className="mt-0.5 truncate text-sm text-gray-500">
              {appointment.treatment}
            </p>

            <div className="mt-1 flex items-center gap-1.5">
              <Stethoscope className="h-3.5 w-3.5 text-gray-400" />

              <p className="truncate text-xs text-gray-400">
                {appointment.doctor}
              </p>
            </div>
          </div>
        </div>

        {/* ================= DETAILS ================= */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3 lg:flex lg:items-center lg:gap-8">

          {/* Time */}
          <div>
            <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-gray-400">
              Time
            </p>

            <div className="flex justify-center items-center gap-1.5 text-sm font-medium text-gray-600">
              <Clock3 className="h-4 w-4 text-emerald-600" />
              {appointment.time}
            </div>
          </div>

          {/* Payment */}
          <div>
            <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-gray-400">
              Payment
            </p>

            <div className="flex justify-center items-center gap-1.5">
              <CircleDollarSign
                className={`h-4 w-4 ${
                  isPaid ? "text-emerald-600" : "text-amber-500"
                }`}
              />

              <div>
                <p
                  className={`text-sm font-semibold ${
                    isPaid ? "text-emerald-600" : "text-amber-600"
                  }`}
                >
                  {appointment.payment}
                </p>

                <p className="text-xs text-gray-400">
                  Rs. {Number(appointment.amount).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-gray-400">
              Status
            </p>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                isConfirmed
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {isConfirmed ? (
                <CheckCircle2 className="h-3.5 w-3.5" />
              ) : (
                <Clock3 className="h-3.5 w-3.5" />
              )}

              {appointment.status}
            </span>
          </div>

        </div>

        {/* ================= ACTION ================= */}
        <button
          type="button"
          className="group/action flex w-full items-center justify-center gap-1.5 rounded-xl border border-gray-100 bg-white px-4 py-2.5 text-sm font-semibold text-gray-500 transition duration-200 hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-600 lg:w-auto"
        >
          View
          <ArrowRight className="h-4 w-4 transition group-hover/action:translate-x-1" />
        </button>

      </div>
    </div>
  );
}

export {AppointmentCard}