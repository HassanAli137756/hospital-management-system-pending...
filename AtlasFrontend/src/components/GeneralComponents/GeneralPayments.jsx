import React, { useState } from "react";
import {
  Accessibility,
  CalendarDays,
  CircleDollarSign,
  Clock3,
  Stethoscope,
  WalletCards,
  ArrowUpRight,
  Banknote,
  Sparkles,
  SyringeIcon,
} from "lucide-react";
import {SummerCards} from "../Patient/utils/SummerCards";
import {CustomButton} from "../../utils/CustomButton";

const GeneralPayments = (
  {
    reload = null,
    startingDate = new Date().toLocaleDateString("en-CA"),
    endingDate = new Date().toLocaleDateString("en-CA"),
    setStartingDate = null,
    setEndingDate = null,
    isReceptionist = false,

    doctorsPaymentList=[],
    checkUpTotal = 0,
    cuppingTotal = 0,
    dryNeedlingTotal = 0,
    monthlyPaid = 0,
    netTotal = 0,
    physioTotal = 0,
    todaysPaid = 0,
    todayPendingPayment = 0,

  }
) => {

  const summaryCards = [

    {
      title: "Today's Payment",
      value: todaysPaid,
      description: "Collected today",
      icon: CircleDollarSign,
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      title: "Pending Today's Payment",
      value: todayPendingPayment,
      description: "Still pending today",
      icon: Clock3,
      iconStyle: "bg-amber-50 text-amber-600",
    },
    {
      title: "Monthly Payment",
      value: monthlyPaid,
      description: "Total collected this month",
      icon: WalletCards,
      iconStyle: "bg-emerald-50 text-emerald-600",
    },
  ];



  const formatAmount = (amount) => Number(amount).toLocaleString("en-PK");

  return (<div className="min-h-full bg-[#f5f8f7] p-4 sm:p-6 lg:p-8"> <div className="mx-auto max-w-7xl space-y-6">

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
          {new Date().toLocaleDateString("en-US", { dateStyle: "medium" })}
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
            className="min-w-full rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm flex justify-start font-medium text-gray-500">
                  {card.title}
                </p>

                <h2 className="mt-2 truncate flex justify-start text-2xl font-bold text-gray-900 sm:text-3xl">
                  Rs. {formatAmount(Number(card.value || 0))}
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

      <div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Starting Date

            <div className="relative">
              <CalendarDays
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                max={endingDate}
                type="date"
                value={startingDate}
                onChange={(e) => setStartingDate?.(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-700 outline-none transition hover:border-emerald-400 hover:bg-white hover:ring-2 hover:ring-emerald-100"
              />
            </div>
            </label>
          </div>

          <div>
            <label className="p-2 block text-sm font-medium text-gray-700">
              Ending Date

            <div className="relative">
              <Clock3
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                min={startingDate}
                type="date"
                value={endingDate}
                onChange={(e) => setEndingDate?.(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-700 outline-none transition hover:border-emerald-400 hover:bg-white hover:ring-2 hover:ring-emerald-100"
              />
            </div>
            </label>

          </div>
        </div>
        <br />
        <div className="flex justify-end">
          <div>
            <CustomButton
              onClick={() => reload?.()}
              classes="gap-2 px-6 py-2.5 text-white font-medium text-sm md:text-base"
              name="Fetch Data"
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
          {doctorsPaymentList.length > 0 ? doctorsPaymentList.map((doctor) => {

            return (
              <div
                key={doctor._id}
                className="rounded-2xl border  border-gray-100 bg-white p-5 shadow-sm transition hover:border-emerald-100 hover:shadow-md"
              >
                {/* Doctor Header */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <img
                    alt="Err" 
                    src={doctor?.avatar}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700" />

                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-gray-900">
                        {doctor.fullName}
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
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-xs font-medium text-gray-500">
                      Physio Total
                    </p>

                    <p className="mt-2 truncate text-lg font-bold text-gray-900">
                      Rs. {formatAmount(doctor?.doctorPayments?.physioTotal?.paidAmount || 0)}
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-xs font-medium text-gray-500">
                      Check-Up Total
                    </p>

                    <p className="mt-2 truncate text-lg font-bold text-gray-900">
                      Rs. {formatAmount(doctor?.doctorPayments?.checkUpTotal?.paidAmount || 0)}
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-xs font-medium text-gray-500">
                      Cupping Total
                    </p>

                    <p className="mt-2 truncate text-lg font-bold text-gray-900">
                      Rs. {formatAmount(doctor?.doctorPayments?.cuppingTotal?.paidAmount || 0)}
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-xs font-medium text-gray-500">
                      Dry-Needling Total
                    </p>

                    <p className="mt-2 truncate text-lg font-bold text-gray-900">
                      Rs. {formatAmount(doctor?.doctorPayments?.dryNeedlingTotal?.paidAmount || 0)}
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
                      Rs. {formatAmount(doctor?.doctorPayments?.netTotal?.paidAmount || 0)}
                    </p>
                  </div>

                  <ArrowUpRight size={19} />
                </div>
              </div>
            );
          }) :
          <div className="min-w-full rounded-2xl border  border-gray-100 bg-white p-5 shadow-sm transition hover:border-emerald-100 hover:shadow-md">
            <h3>
              In data base there is no doctor available
            </h3>
          </div>
          }
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
        </div>
      </div>

      <div className=" divide-y divide-gray-100  sm:divide-x sm:divide-y-0">
        {/* Physio */}

        <div className="grid grid-cols-2 gap-4">

          {/* Physio */}
          <div className="p-5 sm:p-6  rounded-2xl border border-gray-200 ">
            <div className="flex items-center gap-3 ">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Accessibility size={20} />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Physio Total
                </p>

                <p className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                  Rs. {formatAmount(physioTotal)}
                </p>
              </div>
            </div>
          </div>

          {/* Cupping */}
          <div className="p-5 sm:p-6  rounded-2xl border border-gray-200  ">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                <Sparkles size={20} />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Cupping Total
                </p>

                <p className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                  Rs. {formatAmount(cuppingTotal)}
                </p>
              </div>
            </div>
          </div>

          {/* Checkups */}
          <div className="p-5 sm:p-6  rounded-2xl border border-gray-200 ">
            <div className="flex items-center gap-3 ">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Stethoscope size={20} />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">
                  CheckUps Total
                </p>

                <p className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                  Rs. {formatAmount(checkUpTotal)}
                </p>
              </div>
            </div>
          </div>

          {/* DryNeedling */}
          <div className="p-5 sm:p-6  rounded-2xl border border-gray-200  ">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                <SyringeIcon size={20} />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Dry-Needling Total
                </p>

                <p className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                  Rs. {formatAmount(dryNeedlingTotal)}
                </p>
              </div>
            </div>
          </div>
        </div>


        <br />
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

export { GeneralPayments };
