import React, { useEffect, useState } from 'react'
import { GeneralPayments } from '../GeneralComponents/GeneralPayments'
import { useAxios } from '../../useAxios'
import { useSelector } from 'react-redux'
import { ErrorMessage } from '../../utils/ErrorMessage'
import {CustomButton} from '../../utils/CustomButton'
import {Loading} from '../../utils/Loading'
import { GeneralAppointments } from '../GeneralComponents/GeneralAppointment'




function DoctorAppointments() {


  let { data, error, loading, request, setError } = useAxios()
  const RTKUser = useSelector(state => state.userReducer.userInfo)

  const fetchPaymentDetails = async () => {
    if (!RTKUser?.userData?._id) {
      setError("Failed to get your profile, please login to perform this action")
      return;
    }


    await request(`/doctors/get-doctor-appointment/${RTKUser?.userData?._id}`)



  }

  useEffect(() => {
    if (!RTKUser?.userData?._id) 
    {
      setError("There is no user provided");
    }
    if (!RTKUser?.userData?.role !== "doctor")
    {
      setError("You are not allowed to access this page")
    };
    fetchPaymentDetails()
  }, [RTKUser])

  console.log("data", data);
  
  




  return (
    <div>
      
      {
        loading &&
        (<Loading />)
      }

      {
        error?.length > 0 &&
        <div className='flex justify-center'>
          <div>
            <ErrorMessage message={error} />
            <CustomButton name='Reload' onClick={() => fetchPaymentDetails()} />
          </div>
        </div>
      }

      {
        !loading && data && !error &&
        <GeneralAppointments
        appointments={data?.totalSessions}
        pendingAppointments={data?.todaysPendingSessions}
        pendingPayment={data?.todaysPendingPayment?.pendingAmount}
        totalAppointments={data?.totalSessions?.length}
        />
      }
      
      
    </div>
  )
}

export {DoctorAppointments}