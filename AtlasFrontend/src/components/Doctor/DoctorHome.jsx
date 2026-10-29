import React, { useEffect, useState } from 'react'
import { GeneralHome } from '../GeneralComponents/GeneralHome'
import { useAxios } from '../../useAxios'
import { useSelector } from 'react-redux'
import {Loading} from '../../utils/Loading'
import { ErrorMessage } from '../../utils/ErrorMessage'
import {CustomButton} from '../../utils/CustomButton'

function DoctorHome() {


  let { data, error, loading, request, setError } = useAxios()
  const [todayAppointments, setTodayAppointments] = useState([])
  const RTKUser = useSelector(state => state.userReducer.userInfo)



  const fetchHomeDetails = async () => {
    if (!RTKUser?.userData?._id) {
      setError("Failed to get your profile, please login to perform this action")
      return;
    }


    await request("/doctors/get-doctor-home", "post", { doctorId: RTKUser?.userData?._id })



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
        <GeneralHome
        userName={RTKUser?.userData?.fullName}
        pendingAppointmentCounts={data?.pendingAppointmentCounts}
        doneAppointments={data?.doneAppointmentsCounts}
        paidPayment={data?.paidPayments?.[0]?.paidAmount}
        pendingPayment={data?.pendingPayments?.[0]?.pendingAmount}
        todayAppointments={data?.allAppointments}
        totalAppointments={data?.totalAppointmentCounts}
        />
      }
      
    </div>
  )
}

export { DoctorHome }