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
import { AppointmentCards } from "./AppointmetCards";
import { useNavigate } from "react-router-dom";

const GeneralHome = (
{
    doctors=[],
    userName="User",
    pendingAppointmentCounts=0,
    totalAppointments=0,
    doneAppointments=0,
    paidPayment=0,
    pendingPayment=0,
    todayAppointments=[],
    isReceptionist=false
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
path: "/appointment-searcher",
title: "Book Appointment",
description: "Create a new patient appointment",
icon: Plus,
},
{
  path: "/appointment-searcher",
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

const completionPercentage = todayAppointments == 0 ? 0 : Math.round((Number(doneAppointments) * 100) / Number(totalAppointments))
const completionWidth = `${completionPercentage}%`
const navigate = useNavigate()




return ( <div className="min-h-full bg-gray-50/70 p-4 sm:p-6 lg:p-8"> <div className="mx-auto max-w-7xl space-y-6">

    {/* Header */}
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-1 text-sm font-medium text-emerald-600">
          Clinic Overview
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Hello, {userName}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Here is today's clinic activity at a glance.
        </p>
      </div>

      <div className="flex w-fit items-center gap-2 rounded-xl border border-gray-100 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm">
        <CalendarDays className="h-4 w-4 text-emerald-600" />
        <span>{new Date().toLocaleDateString("en-US", {dateStyle: "long"})}</span>
      </div>
    </div>

    {/* Daily Stats */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
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

    {/* Doctors Status */}
        {
          isReceptionist &&
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

          {
            doctors.length > 0 ? 
            doctors.map(doc =>
            {
              const onDuty = doc.doctorField.onDuty
              return(
                <div  
                key={doc._id}
                className="divide-y divide-gray-100">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <img 
                className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700"
                src={doc.avatar} 
                alt="Err" />
                
                <div>
                  <p className={`text-sm font-semibold ${onDuty ? "text-gray-800" : "text-gray-400"}`}>
                    Dr. {doc.fullName}
                  </p>

                  
                  <div className="flex justify-start ">
                    <p className="text-xs text-gray-400">
                    {onDuty ? "Available" : "Not Available"}
                  </p>
                  </div>
                </div>
              </div>

              <span className={`flex items-center gap-1.5 text-xs font-semibold ${onDuty ? "text-emerald-500" : "text-gray-500"}`}>
                <span className={`h-2 w-2 rounded-full ${onDuty ? "bg-emerald-500" : "bg-gray-500"}`} />
                {onDuty ? "On Duty" : "Off Duty"}
              </span>
            </div>

          </div>
              )
            }
            ) :
            <p>There is no doctor on duty</p> 
          }

        </section>
        }

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
              onClick={() => navigate(action?.path)}
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
      

        
        <AppointmentCards
        header="Today's Appointments"
        message="All appointments for today."
        isReceptionist={isReceptionist}
        appointments={todayAppointments}
        />

      {/* Right Side */}
      <div className="space-y-6">

        

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

          </div>

          <div className="mt-5 rounded-xl bg-amber-50/70 p-4">
            <p className="text-xs font-medium text-amber-700">
              Total Outstanding
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              Rs. {Number(pendingPayment).toLocaleString()}
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
              {doneAppointments} of {totalAppointments} appointments completed today.
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

          <div 
          style={{width: completionWidth}}
          className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div className={`h-full rounded-full bg-emerald-500 `} />
          </div>
        </div>
      </div>
    </section>

  </div>
</div>

);
};

export {GeneralHome};
