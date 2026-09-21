import React, { useState } from "react";
import {
CalendarDays,
CircleDollarSign,
Clock3,
CreditCard,
Stethoscope,
UserRound,
WalletCards,
ArrowUpRight,
Banknote,
} from "lucide-react";

const GeneralPayments = (
{
    isReceptionist=false
}
) => {
const [startingDate, setStartingDate] = useState("2026-10-01");
const [pendingDate, setPendingDate] = useState("2026-10-03");

const summaryCards = [

{
title: "Today's Payment",
value: "Rs. 12,500",
description: "Collected today",
icon: CircleDollarSign,
iconStyle: "bg-blue-50 text-blue-600",
},
{
title: "Pending Today's Payment",
value: "Rs. 8,500",
description: "Still pending today",
icon: Clock3,
iconStyle: "bg-amber-50 text-amber-600",
},
{
title: "Monthly Payment",
value: "Rs. 185,500",
description: "Total collected this month",
icon: WalletCards,
iconStyle: "bg-emerald-50 text-emerald-600",
},
];

const doctors = [
{
name: "Dr. Ahmed Khan",
initials: "AK",
physio: 32500,
cupping: 18500,
},
{
name: "Dr. Muhammad Ali",
initials: "MA",
physio: 28700,
cupping: 22400,
},
{
name: "Dr. Usman",
initials: "US",
physio: 25400,
cupping: 16200,
},
{
name: "Dr. Hassan Ahmed",
initials: "HA",
physio: 30100,
cupping: 21300,
},
];

const monthlyTotal = {
physio: doctors.reduce((total, doctor) => total + doctor.physio, 0),
cupping: doctors.reduce((total, doctor) => total + doctor.cupping, 0),
};

const netTotal = monthlyTotal.physio + monthlyTotal.cupping;

const formatAmount = (amount) => amount.toLocaleString("en-PK");

return ( <div className="min-h-full bg-[#f5f8f7] p-4 sm:p-6 lg:p-8"> <div className="mx-auto max-w-7xl space-y-6">

    {/* Header */}
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Payments
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Track daily, pending, and monthly payments across all doctors.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-white px-4 py-2.5 shadow-sm">
        <CalendarDays size={17} className="text-emerald-600" />
        <span className="text-sm font-medium text-gray-600">
          October 2026
        </span>
      </div>
    </div>

    {/* Summary Cards */}
    <div className="grid grid-cols-1 gap-4 ">
      {summaryCards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="min-w-0 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm flex justify-start font-medium text-gray-500">
                  {card.title}
                </p>

                <h2 className="mt-2 truncate flex justify-start text-2xl font-bold text-gray-900 sm:text-3xl">
                  {card.value}
                </h2>

                <p className="mt-1 truncate flex justify-start text-xs text-gray-400">
                  {card.description}
                </p>
              </div>

              <div
                className={`shrink-0 rounded-xl p-3 ${card.iconStyle}`}
              >
                <Icon size={21} />
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {/* Date Filters */}
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
          <CalendarDays size={18} />
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            Payment Period
          </h2>

          <p className="text-xs text-gray-500">
            Select dates to calculate payment records.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Starting Date
          </label>

          <div className="relative">
            <CalendarDays
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="date"
              value={startingDate}
              onChange={(e) => setStartingDate(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Pending Date
          </label>

          <div className="relative">
            <Clock3
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="date"
              value={pendingDate}
              onChange={(e) => setPendingDate(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
            />
          </div>
        </div>
      </div>
    </div>

    {/* Doctor Payments */}
    {
        isReceptionist &&
        <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Doctor-wise Payments
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Physiotherapy and cupping collection for each doctor.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {doctors.map((doctor) => {
          const doctorTotal = doctor.physio + doctor.cupping;

          return (
            <div
              key={doctor.name}
              className="rounded-2xl border  border-gray-100 bg-white p-5 shadow-sm transition hover:border-emerald-100 hover:shadow-md"
            >
              {/* Doctor Header */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700">
                    {doctor.initials}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-gray-900">
                      {doctor.name}
                    </h3>

                    <div className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-500">
                      <Stethoscope size={13} />
                      Doctor Payment Summary
                    </div>
                  </div>
                </div>

                <div className="shrink-0 rounded-lg bg-emerald-50 p-2 text-emerald-600">
                  <Banknote size={18} />
                </div>
              </div>

              {/* Payment Breakdown */}
              <div className="mt-5 grid grid-cols-1 gap-3">
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-xs font-medium text-gray-500">
                    Physio Total
                  </p>

                  <p className="mt-2 truncate text-lg font-bold text-gray-900">
                    Rs. {formatAmount(doctor.physio)}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-xs font-medium text-gray-500">
                    Cupping Total
                  </p>

                  <p className="mt-2 truncate text-lg font-bold text-gray-900">
                    Rs. {formatAmount(doctor.cupping)}
                  </p>
                </div>
              </div>

              {/* Doctor Total */}
              <div className="mt-3 flex items-center justify-between rounded-xl bg-emerald-600 px-4 py-3.5 text-white">
                <div>
                  <p className="text-xs font-medium text-emerald-100">
                    Doctor Total
                  </p>

                  <p className="mt-0.5 text-lg font-bold">
                    Rs. {formatAmount(doctorTotal)}
                  </p>
                </div>

                <ArrowUpRight size={19} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
    }

    {/* Monthly Hisaab */}
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="border-b border-gray-100 p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Payment Period Summary
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Complete payment period summary of all doctors.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
            <CreditCard size={15} />
            October 2026
          </div>
        </div>
      </div>

      <div className=" divide-y divide-gray-100  sm:divide-x sm:divide-y-0">
        {/* Physio */}
        
        <div className="grid grid-cols-2 ">
          <div className="p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Stethoscope size={20} />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Physio Total
              </p>

              <p className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                Rs. {formatAmount(monthlyTotal.physio)}
              </p>
            </div>
          </div>
        </div>

        {/* Cupping */}
        <div className="p-5 sm:p-6  rounded-2xl ">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
              <CircleDollarSign size={20} />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Cupping Total
              </p>

              <p className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                Rs. {formatAmount(monthlyTotal.cupping)}
              </p>
            </div>
          </div>
        </div>
        </div>

        {/* Net Total */}
        <div className="bg-emerald-50/60 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-600 p-3 text-white">
              <WalletCards size={20} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-emerald-700">
                Net Total
              </p>

              <p className="mt-1 truncate text-2xl font-bold text-emerald-800">
                Rs. {formatAmount(netTotal)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

);
};

export {GeneralPayments};
