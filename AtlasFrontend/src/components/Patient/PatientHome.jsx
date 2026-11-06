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
import {Loading} from '../../utils/Loading';
import { ErrorMessage } from '../../utils/ErrorMessage';
import { useAxios } from '../../useAxios';
import {SummerCards} from './utils/SummerCards';
import {CustomButton} from '../../utils/CustomButton';
import { useEffect } from 'react';
import {PendingAppointmentCards} from './utils/TodaysAppointment';
import { useNavigate } from 'react-router-dom';

function PatientHome() {

  let { data, error, loading, request, setError } = useAxios()
  const [todayAppointments, setTodayAppointments] = useState([])
  const RTKUser = useSelector(state => state.userReducer.userInfo)
  const navigate = useNavigate()
  

  const fetchHomeDetails = async () => {
    if(!RTKUser?.userData?.userProfileId) 
    {
      setError("Failed to get your profile, please login to perform this action")
      return;
    }


    await request("/appointments/get-patient-home", "post", {userProfileId: RTKUser?.userData?.userProfileId})

    

  }
  
  useEffect(() =>
  {
    if(!RTKUser?.userData?.userProfileId) 
    {
      setError("There is no user provided");
    }
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
          
          
              <PendingAppointmentCards
              currentRole={RTKUser?.userData?.role}
              appointments={data?.todaysAppointments || []}
              />
      <br />

          <SummerCards 
          doneSessions={{value:data.doneAppointmentsCounts || 0, allowed:true}}
          paidPayment={{value:data.paidPayments?.paidAmount || 0, allowed:true}}
          pendingPayment={{value:data.pendingPayments?.pendingAmount || 0, allowed:true}}
          pendingSessions={{value:data.pendingAppointments?.length || 0, allowed:true}}
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
            onClick={() => navigate("/book-appointment")}
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

export {PatientHome}