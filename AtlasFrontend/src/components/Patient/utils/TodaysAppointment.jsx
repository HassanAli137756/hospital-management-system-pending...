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
import { useNavigate } from 'react-router-dom';

function PendingAppointmentCards(
{ 
  currentRole="",
  appointments = [],
  label=`Today's Appointment`,
  message="Your appointment for today"
}) {

  const navigate = useNavigate()

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

      {/* Section Header */}
      <div className="px-5 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
            <CalendarDays
              size={19}
              className="text-emerald-700"
            />
          </div>

          <div>
            <h2 className="font-semibold text-gray-900">
              {label}
            </h2>

            <p className="text-xs text-gray-400 mt-0.5">
              {message}
            </p>
          </div>

        </div>

        {/* Appointment Count */}
        <span className="
          inline-flex items-center gap-1.5
          px-2.5 py-1.5
          rounded-full
          bg-emerald-50
          text-emerald-700
          text-xs font-semibold
        ">
          <CheckCircle2 size={14} />
          {appointments.length} Appointments
        </span>

      </div>

      {/* Appointment Cards */}
      <div className="p-5 sm:p-6 grid grid-cols-1 xl:grid-cols-2 gap-4">

        {appointments.length > 0 ? appointments.map((appointment) => (

          <div
            key={appointment._id}
            className="rounded-2xl border border-gray-200 overflow-hidden"
          >

            {/* Appointment Body */}
            <div className="p-5 sm:p-6">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                {/* Doctor */}
                <div className="flex items-center gap-4">

                  <div className="
                    w-14 h-14
                    shrink-0
                    rounded-2xl
                    bg-emerald-50
                    border border-emerald-100
                    flex items-center justify-center
                  ">
                    <Stethoscope
                      size={25}
                      className="text-emerald-700"
                      strokeWidth={1.8}
                    />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Doctor
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-gray-900">
                      {appointment.doctor?.fullName}
                    </h3>

                  </div>

                </div>

                {/* Appointment Details */}
                <div className="flex flex-wrap items-center gap-3">

                  <div className="
                    flex items-center gap-2
                    px-3.5 py-2.5
                    rounded-xl
                    bg-gray-50
                    border border-gray-100
                  ">
                    <Clock3
                      size={17}
                      className="text-emerald-700"
                    />

                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                        Time
                      </p>

                      <p className="text-sm font-semibold text-gray-800">
                        {appointment.times.time}
                      </p>
                    </div>
                  </div>

                  <div className="
                    flex items-center gap-2
                    px-3.5 py-2.5
                    rounded-xl
                    bg-gray-50
                    border border-gray-100
                  ">
                    <CalendarDays
                      size={17}
                      className="text-emerald-700"
                    />

                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                        Date
                      </p>

                      <p className="text-sm font-semibold text-gray-800">
                        {new Date(appointment.times.date?.replace("Z", "")).toLocaleDateString("en-US", {dateStyle: "medium"})}
                      </p>
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom Appointment Info */}
              <div className="
                mt-6
                pt-5
                border-t border-gray-100
                flex flex-col sm:flex-row
                sm:items-center
                sm:justify-between
                gap-4
              ">

                <div>
                  <p className="text-xs text-gray-400">
                    Appointment Type
                  </p>

                  <p className="text-sm font-medium text-gray-800 mt-1">
                    {appointment.forSession?.slice(0, 1)?.toUpperCase() + appointment?.forSession?.slice(1, appointment?.forSession?.length)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    navigate("/update-appointment",
                      {
                        state:
                        {
                          appointmentId: appointment._id,
                          fullName: appointment.generalPatientInfo?.patientName,
                          email: appointment.generalPatientInfo?.email,
                          cellNo: appointment.generalPatientInfo?.cellNo,
                          diagnoses: appointment.diagnoses,
                          doctor: appointment.doctor?._id,
                          time: appointment.times.time,
                          day: new Date(appointment.times?.date).toLocaleDateString("en-US", {weekday: "long"}).toLowerCase(),
                          paymentStatus: appointment.paymentStatus,
                          treatmentStatus: appointment.status,
                          paid: appointment.paymentSection?.paid,
                          payable: appointment.paymentSection?.payable,
                          forSession: appointment.forSession,
                          updationTime: appointment.times?.timeOfUpdation,
                          role: currentRole
                        }
                      }
                    )
                  }}
                  className="
                    inline-flex items-center justify-center gap-2
                    px-4 py-2.5
                    rounded-xl
                    border border-gray-200
                    bg-white
                    text-sm font-medium
                    text-gray-700
                    hover:bg-gray-50
                    hover:border-emerald-200
                    hover:text-emerald-700
                    transition
                  "
                >
                  Edit/Update
                  <ArrowRight size={16} />
                </button>

              </div>

            </div>

          </div> 

        )) : (<p>There is no booked appointment</p>)}

      </div>

    </section>
  )
}

export {PendingAppointmentCards}