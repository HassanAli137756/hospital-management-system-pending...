import React from 'react'
import { GeneralAppointments } from '../GeneralComponents/GeneralAppointment'
import { useEffect, useState } from 'react'
import { useAxios } from '../../useAxios'
import { useSelector } from 'react-redux'
import {Loading} from '../../utils/Loading'
import { ErrorMessage } from '../../utils/ErrorMessage'
import {CustomButton} from '../../utils/CustomButton'

function ReceptionistAppointments() {


  let { data, error, loading, request, setError } = useAxios()
  const RTKUser = useSelector(state => state.userReducer.userInfo)



  const fetchHomeDetails = async () => {
    if (!RTKUser?.userData?._id) {
      setError("Failed to get your profile, please login to perform this action")
      return;
    }


    await request("/receptionist/get-appointments-details")



  }

  useEffect(() => {
    if (!RTKUser?.userData?.userProfileId) 
    {
      setError("There is no user provided");
    }
    fetchHomeDetails()
  }, [RTKUser])

  

  return (
    <div className='relative'>

      {
        loading &&
        (<Loading />)
      }

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
        <GeneralAppointments
        appointments={data?.allAppointments}
        pendingAppointments={data?.pendingAppointmentCounts}
        pendingPayment={data?.pendingPayments?.pendingAmount}
        totalAppointments={data?.totalAppointmentCounts}
        />
      }
      
    </div>
  )
}

export {ReceptionistAppointments}