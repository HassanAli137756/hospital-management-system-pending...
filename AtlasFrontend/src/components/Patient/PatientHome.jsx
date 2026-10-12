import React, { useState } from 'react'

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
import { useSelector } from 'react-redux';
import TodaysAppointment from './utils/TodaysAppointment';
import Loading from '../../utils/Loading';
import { ErrorMessage } from '../../utils/ErrorMessage';
import { useAxios } from '../../useAxios';
import SummerCards from './utils/SummerCards';
import CustomButton from '../../utils/CustomButton';
import { useEffect } from 'react';

export default function PatientHome() {

  let { data, error, loading, request, setError } = useAxios()
  const [todayAppointments, setTodayAppointments] = useState([])
  const RTKUser = useSelector(state => state.userReducer.userInfo)

  

  const fetchHomeDetails = async () => {
    if(!RTKUser?.userData?.userProfileId) 
    {
      setError("Failed to get your profile, please login to perform this action")
      return;
    }

  console.log("RTKUser: ", RTKUser?.userData?.userProfileId);

    await request("/appointments/get-patient-home", "post", {userProfileId: RTKUser?.userData?.userProfileId})

    

  }
  
  useEffect(() =>
  {
    fetchHomeDetails()
  }, [RTKUser])
  
  useEffect(() =>
  {
    if(data?.success && data?.statusCode == 200 || 201)
    {
      console.log("data in correct side: ", data);
      
      const now = new Date().toLocaleDateString()
      const targettedAppointments = data?.pendingAppointments?.filter(appointment => 
      {
        let appointedDate = new Date(appointment.times.date)

        console.log("AppoinetedDate: ", appointedDate.toLocaleDateString(), now);
        

        if(now == appointedDate.toLocaleDateString())
        {
          console.log("appointment: ", appointment);
          
          return appointment
        }

      }
      )

      setTodayAppointments(targettedAppointments)
      
    }
  }, [data])

  console.log("Today Appointments: ", todayAppointments);
  

  return (
    <div className="space-y-6">

      {
        loading &&
        (<Loading />)
      }
      
      <section>
        <p className="text-sm font-medium text-emerald-700">
          Welcome back
        </p>

        <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900">
          Hello, {RTKUser?.userData?.fullName}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Here’s a quick overview of your clinic activities.
        </p>
      </section>

      <br />
      {
        error?.length > 0 &&
        <div className='flex justify-center'>
          <div>
            <ErrorMessage message={error} />
            <CustomButton name='Reload' onClick={() => fetchHomeDetails()} />
          </div>
        </div>
      }

      {
        !loading && data &&
        <div>
          
          
              <TodaysAppointment
              appointments={todayAppointments}
              />
      <br />

          <SummerCards 
          doneSessions={data.doneAppointmentsCounts}
          paidPayment={data.paidPayments?.[0].paidAmount}
          pendingPayment={data.pendingPayments?.[0].pendingAmount}
          pendingSessions={data.pendingAppointments?.length}
          />
      <br />

          <section className="
        bg-white
        rounded-2xl
        border border-gray-100
        shadow-sm
        p-5 sm:p-6
      ">

        <div className="
          flex flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-5
        ">

          <div className="flex items-center gap-4">

            <div className="
              w-12 h-12
              shrink-0
              rounded-xl
              bg-emerald-50
              flex items-center justify-center
            ">
              <CalendarDays
                size={23}
                className="text-emerald-700"
              />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                Need another appointment?
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Choose an available doctor and appointment time.
              </p>
            </div>

          </div>


          {/* Booking Button */}
          <button
            type="button"
            className="
              inline-flex items-center justify-center gap-2
              px-5 py-3
              rounded-xl
              bg-emerald-700
              text-white
              text-sm font-semibold
              shadow-sm
              hover:bg-emerald-800
              active:bg-emerald-900
              active:scale-[0.98]
              focus:outline-none
              focus:ring-2
              focus:ring-emerald-200
              transition
            "
          >
            <Plus size={18} />
            Book Appointment
          </button>

        </div>

          </section>
        </div>
      }

      

    </div>
  );
}
