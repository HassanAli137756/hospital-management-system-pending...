import React, { useEffect, useState } from 'react'
import { GeneralPayments } from '../GeneralComponents/GeneralPayments'
import { useAxios } from '../../useAxios'
import { useSelector } from 'react-redux'
import { ErrorMessage } from '../../utils/ErrorMessage'
import {CustomButton} from '../../utils/CustomButton'
import {Loading} from '../../utils/Loading'


let startingDefault = new Date()
let endingDefault = new Date()
startingDefault.setDate(1)
endingDefault.setFullYear(startingDefault.getFullYear(), startingDefault.getMonth() + 1, 0)


function DoctorPayments() {

  const [startingDate, setStartingDate] = useState(startingDefault.toLocaleDateString('en-CA'));
  const [endingDate, setEndingDate] = useState(endingDefault.toLocaleDateString('en-CA'));


  let { data, error, loading, request, setError } = useAxios()
  const RTKUser = useSelector(state => state.userReducer.userInfo)

  const fetchPaymentDetails = async () => {
    if (!RTKUser?.userData?._id) {
      setError("Failed to get your profile, please login to perform this action")
      return;
    }


    await request("/doctors/get-doctor-payments", "post", 
    {
      doctorId: RTKUser?.userData?._id,
      starting: startingDate,
      ending: endingDate
    })



  }

  useEffect(() => {
    if (!RTKUser?.userData?.userProfileId) 
    {
      setError("There is no user provided");
    }
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
        !loading && data &&
        <GeneralPayments
        reload={() => fetchPaymentDetails()}
        endingDate={endingDate}
        startingDate={startingDate}
        setStartingDate={(date) => setStartingDate(date)}
        setEndingDate={(date) => setEndingDate(date)}
        isReceptionist={false}

        checkUpTotal={data?.checkUpTotal?.paidAmount || 0}
        cuppingTotal={data?.cuppingTotal?.paidAmount || 0}
        dryNeedlingTotal={data?.dryNeedlingTotal?.paidAmount || 0}
        monthlyPaid={data?.monthlyPaid?.paidAmount || 0}
        netTotal={data?.netTotal?.paidAmount || 0}
        physioTotal={data?.physioTotal?.paidAmount || 0}
        todaysPaid={data?.todaysPaid?.paidAmount || 0}
        todayPendingPayment={data?.todayPendingPayment?.pendingAmount || 0}

        />
      }
      
      
    </div>
  )
}

export {DoctorPayments}