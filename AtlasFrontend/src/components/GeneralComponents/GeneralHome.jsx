import React from "react";
import {
CalendarDays,
UserRoundCheck,
Clock3,
CreditCard,
CircleDollarSign,
Plus,
Search,
ArrowRight,
CheckCircle2,
Stethoscope,
} from "lucide-react";

const ReceptionistHome = (
{
    totalBookingTimes="15",
    totalAppointments="14",
    doneAppointments="5",
    paidPayment="5000",
    pendingPayment="5000",
    todayAppointments = [
    {
    id: 1,
    patient: "Ali Raza",
    doctor: "Dr. Ahmed Khan",
    treatment: "Physiotherapy",
    time: "04:00 PM",
    status: "Confirmed",
    },
    {
    id: 2,
    patient: "Sara Ahmed",
    doctor: "Dr. Muhammad Ali",
    treatment: "Cupping Therapy",
    time: "05:00 PM",
    status: "Pending",
    },
    {
    id: 3,
    patient: "Hamza Tariq",
    doctor: "Dr. Usman",
    treatment: "Dry Needling",
    time: "05:30 PM",
    status: "Confirmed",
    },
    {
    id: 4,
    patient: "Ayesha Noor",
    doctor: "Dr. Ahmed Khan",
    treatment: "Physiotherapy",
    time: "06:30 PM",
    status: "Confirmed",
    },
    ]
}
) => {
const stats = [
{
title: "Today's Appointments",
value: totalAppointments,
description: "Appointments scheduled today",
icon: CalendarDays,
},
{
title: "Today's Done",
value: doneAppointments,
description: "Appointments completed today",
icon: CheckCircle2,
},
{
title: "Today's Payment",
value: `Rs. ${Number(paidPayment).toLocaleString()}`,
description: "Payment received today",
icon: CircleDollarSign,
},
{
title: "Pending Payment",
value: `Rs. ${Number(pendingPayment).toLocaleString()}`,
description: "Outstanding amount",
icon: CreditCard,
},
];

const quickActions = [
{
title: "Book Appointment",
description: "Create a new patient appointment",
icon: Plus,
},
{
title: "Find Patient",
description: "Search patient records quickly",
icon: Search,
},
{
title: "Record Payment",
description: "Update a pending payment",
icon: CircleDollarSign,
},
];

const completionPercentage = Math.floor((Number(totalAppointments) * 100) / Number(totalBookingTimes))
const completionWidth = `w-[${completionPercentage}%]`


return ( <div className="min-h-full bg-gray-50/70 p-4 sm:p-6 lg:p-8"> <div className="mx-auto max-w-7xl space-y-6">

    {/* Header */}
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-1 text-sm font-medium text-emerald-600">
          Clinic Overview
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Good Morning, Receptionist
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Here is today's clinic activity at a glance.
        </p>
      </div>

      <div className="flex w-fit items-center gap-2 rounded-xl border border-gray-100 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm">
        <CalendarDays className="h-4 w-4 text-emerald-600" />
        <span>October 02, 2026</span>
      </div>
    </div>

    {/* Daily Stats */}
    <div className="grid grid-cols-2 gap-4 ">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  {stat.value}
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  {stat.description}
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

    {/* Quick Actions */}
    <section>
      <div className="mb-3">
        <h2 className="text-lg font-bold text-gray-900">
          Quick Actions
        </h2>

        <p className="mt-0.5 text-sm text-gray-500">
          Frequently used receptionist tasks.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 ">
        {quickActions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              type="button"
              className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-emerald-100 hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900">
                  {action.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {action.description}
                </p>
              </div>

              <ArrowRight className="h-4 w-4 shrink-0 text-gray-300 transition group-hover:translate-x-1 group-hover:text-emerald-600" />
            </button>
          );
        })}
      </div>
    </section>

    {/* Main Content */}
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

      {/* Today's Appointments */}
      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm xl:col-span-2">
        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Today's Appointments
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Upcoming appointments for today.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {todayAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex flex-col gap-4 p-5 transition hover:bg-gray-50/60 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <UserRoundCheck className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {appointment.patient}
                  </h3>

                  <p className="mt-0.5 text-sm text-gray-500">
                    {appointment.treatment}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {appointment.doctor}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <div className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
                  <Clock3 className="h-4 w-4 text-emerald-600" />
                  {appointment.time}
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    appointment.status === "Confirmed"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {appointment.status}
                </span>

                <button
                  type="button"
                  className="hidden rounded-lg p-2 text-gray-400 transition hover:bg-emerald-50 hover:text-emerald-600 sm:block"
                  aria-label={`View ${appointment.patient} appointment`}
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Right Side */}
      <div className="space-y-6">

        {/* Doctors Status */}
        <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-5">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-emerald-600" />

              <h2 className="text-lg font-bold text-gray-900">
                Doctors Status
              </h2>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              Current duty status.
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700">
                  AK
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Dr. Ahmed Khan
                  </p>

                  <p className="text-xs text-gray-400">
                    Physiotherapy
                  </p>
                </div>
              </div>

              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                On Duty
              </span>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700">
                  MA
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Dr. Muhammad Ali
                  </p>

                  <p className="text-xs text-gray-400">
                    Cupping Therapy
                  </p>
                </div>
              </div>

              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                On Duty
              </span>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-500">
                  US
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Dr. Usman
                  </p>

                  <p className="text-xs text-gray-400">
                    Dry Needling
                  </p>
                </div>
              </div>

              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                On Duty
              </span>
            </div>
          </div>
        </section>

        {/* Pending Payments */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-amber-500" />

                <h2 className="text-lg font-bold text-gray-900">
                  Pending Payments
                </h2>
              </div>

              <p className="mt-1 text-sm text-gray-500">
                Outstanding from patients.
              </p>
            </div>

            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
              5
            </span>
          </div>

          <div className="mt-5 rounded-xl bg-amber-50/70 p-4">
            <p className="text-xs font-medium text-amber-700">
              Total Outstanding
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              Rs. 8,500
            </p>

            <button
              type="button"
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-amber-700 hover:text-amber-800"
            >
              Manage Payments
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

      </div>
    </div>

    {/* Today's Completion */}
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>

          <div>
            <h2 className="font-bold text-gray-900">
              Today's Progress
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              8 of 18 appointments completed today.
            </p>
          </div>
        </div>

        <div className="w-full sm:max-w-xs">
          <div className="mb-2 flex items-center justify-between text-xs font-medium">
            <span className="text-gray-500">
              Completed
            </span>

            <span className="text-emerald-600">
              {completionPercentage}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div className={`h-full rounded-full bg-emerald-500 ${completionWidth} `} />
          </div>
        </div>
      </div>
    </section>

  </div>
</div>

);
};

export default ReceptionistHome;
