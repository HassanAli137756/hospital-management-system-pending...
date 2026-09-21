import React from "react";
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
import { AppointmentCard } from "../../utils/AppointmentCard";


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


const GeneralAppointments = ({
  totalAppointments = "14",
  pendingAppointments = "3",
  pendingPayment = "2000",

  appointments = [
    {
      id: 1,
      patient: "Ali Raza",
      doctor: "Dr. Ahmed Khan",
      treatment: "Physiotherapy",
      time: "04:00 PM",
      status: "Confirmed",
      payment: "Paid",
      amount: "1500",
    },
    {
      id: 2,
      patient: "Sara Ahmed",
      doctor: "Dr. Muhammad Ali",
      treatment: "Cupping Therapy",
      time: "05:00 PM",
      status: "Pending",
      payment: "Pending",
      amount: "2000",
    },
    {
      id: 3,
      patient: "Hamza Tariq",
      doctor: "Dr. Usman",
      treatment: "Dry Needling",
      time: "05:30 PM",
      status: "Confirmed",
      payment: "Paid",
      amount: "1800",
    },
    {
      id: 4,
      patient: "Ayesha Noor",
      doctor: "Dr. Ahmed Khan",
      treatment: "Physiotherapy",
      time: "06:30 PM",
      status: "Confirmed",
      payment: "Paid",
      amount: "1500",
    },
  ],
}) => {
  const stats = [
    {
      title: "Total Appointments",
      value: totalAppointments,
      description: "Appointments scheduled today",
      icon: CalendarDays,
    },
    {
      title: "Pending Appointments",
      value: pendingAppointments,
      description: "Appointments waiting to be completed",
      icon: Clock3,
    },
    {
      title: "Pending Payment",
      value: `Rs. ${Number(pendingPayment).toLocaleString()}`,
      description: "Outstanding amount",
      icon: CreditCard,
    },
  ];

  return (
    <div className="min-h-full bg-gray-50/70 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-medium text-emerald-600">
              Appointment Management
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Today's Appointments
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage today's appointments and patient visits.
            </p>
          </div>

        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 gap-4 ">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex justify-start">
                      <p className="text-sm font-medium text-gray-500">
                        {stat.title}
                      </p>
                    </div>
                    
                    <div className="flex justify-start">

                      <h2 className="mt-2 ml-2 text-2xl font-bold text-gray-900">
                        {stat.value.padStart('2', "0")}
                      </h2>
                      </div>

                    <div className="flex justify-start">
                        <p className="mt-1 text-xs text-gray-400">
                          {stat.description}
                        </p>
                    </div>

                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-100">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

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

        {/* ================= APPOINTMENTS ================= */}
        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

          {/* Section Header */}
          <div className="flex flex-col gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Appointments
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Today's scheduled patient appointments.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-600">
              <CalendarDays className="h-4 w-4 text-emerald-600" />
              October 02, 2026
            </div>
          </div>

          {/* Appointment List */}
          <div className="divide-y divide-gray-100">

            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
              />
            ))}

          </div>

        </section>
      </div>
    </div>
  );
};


export {GeneralAppointments};
