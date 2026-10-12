import React from "react";
import {
  CalendarPlus,
  ArrowLeft,
  ShieldCheck,
  Clock3,
  Stethoscope,
  CircleCheck,
  Info,
} from "lucide-react";
import { LoginForm } from "../forms/LoginForm";
import { AppointmentForm } from "../forms/AppointmentForm";
import Loading from "../utils/Loading";
import { ErrorMessage } from "../utils/ErrorMessage";
import { useAxios } from "../useAxios";
import { useEffect } from "react";
import CustomButton from "../utils/CustomButton";


const BookAppointment = () => {

  let { data, error, loading, request, setError, setData, setLoading } = useAxios()



  const fetchDoctors = async () => {
    
    await request("/doctors/get-all-doctor-times", "get")
  }

  useEffect(() =>
  {
    fetchDoctors()
  }, [])

  return (
  <div className=" min-h-full bg-[#f5f8f7] px-4 py-6 sm:px-6 lg:px-8"> 
  <div className="relative mx-auto w-full max-w-5xl">

    
    {
      loading &&
      <Loading />
    }


    {/* ================= PAGE HEADER ================= */}
    <div className="mb-6">
      <button
        type="button"
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-emerald-700"
      >
        <ArrowLeft size={17} />
        Back to Appointments
      </button>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
              <CalendarPlus size={21} strokeWidth={1.9} />
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Book Appointment
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Schedule your next treatment session with our clinic.
              </p>
            </div>
          </div>
        </div>

        {/* Small status badge */}
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
          <CircleCheck size={14} />
          Appointment Booking
        </div>
      </div>
    </div>

    {/* ================= MAIN LAYOUT ================= */}
    <div className="grid grid-cols-1 gap-6 ">

      {/* ================= FORM CARD ================= */}
      <section className="min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

        {/* Card Header */}
        <div className="border-b border-gray-100 px-5 py-5 sm:px-7">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CalendarPlus size={19} />
            </div>

            <div className="min-w-0">
              <h2 className="font-semibold text-gray-900">
                Appointment Details
              </h2>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Please provide the required information to schedule
                your appointment.
              </p>
            </div>
          </div>
        </div>

        {/* ================= FORM AREA ================= */}
        <div className="p-5 sm:p-7">

            <br />
            {
              error?.length > 0 &&
              (
                <div className="flex justify-center">
                  <div>
                    <ErrorMessage message={error} />
                  <CustomButton
                  name="Reload"
                  onClick={() => fetchDoctors()}
                  />
                  </div>
                </div>
              )
            }
            {
              !loading && data &&
              (
                <AppointmentForm
                doctorTimes={data?.DBDoctors}
                doctorsList={data?.doctorNames} 
                />
              )
            }



        </div>
      </section>

    </div>

    {/* ================= BOTTOM NOTE ================= */}
    <div className="mt-5 flex items-start gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3.5 shadow-sm">
      <Info
        size={16}
        className="mt-0.5 shrink-0 text-gray-400"
      />

      <p className="text-xs leading-5 text-gray-500">
        Please review your selected doctor, treatment, date and
        appointment time before confirming your booking.
      </p>
    </div>

  </div>
  </div>

  );
};

export default BookAppointment;
