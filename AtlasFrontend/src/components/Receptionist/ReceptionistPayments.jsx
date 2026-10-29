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

  const doctors = [
    {
      name: "Dr. Ahmed Khan",
      initials: "AK",
      physio: 32500,
      cupping: 18500,
    },
    {
      name: "Dr. Muhammad Ali",
      initials: "MA",
      physio: 28700,
      cupping: 22400,
    },
    {
      name: "Dr. Usman",
      initials: "US",
      physio: 25400,
      cupping: 16200,
    },
    {
      name: "Dr. Hassan Ahmed",
      initials: "HA",
      physio: 30100,
      cupping: 21300,
    },
  ];


function ReceptionistPayments() {

  const [startingDate, setStartingDate] = useState(startingDefault.toLocaleDateString('en-CA'));
  const [endingDate, setEndingDate] = useState(endingDefault.toLocaleDateString('en-CA'));


  let { data, error, loading, request, setError } = useAxios()
  const RTKUser = useSelector(state => state.userReducer.userInfo)

  const fetchPaymentDetails = async () => {
    if (!RTKUser?.userData?._id) {
      setError("Failed to get your profile, please login to perform this action")
      return;
    }


    await request("/receptionist/get-payment-details", "post", 
    {
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

  console.log("starting", startingDate);
  console.log("ending", endingDate);
  
  




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
        isReceptionist={true}

        doctorsPaymentList={data?.doctorsDetails}
        checkUpTotal={data?.otherData?.checkUpTotal?.paidAmount || 0}
        cuppingTotal={data?.otherData?.cuppingTotal?.paidAmount || 0}
        dryNeedlingTotal={data?.otherData?.dryNeedlingTotal?.paidAmount || 0}
        monthlyPaid={data?.otherData?.monthlyPaid?.paidAmount || 0}
        netTotal={data?.otherData?.overAllTotal?.paidAmount || 0}
        physioTotal={data?.otherData?.physioTotal?.paidAmount || 0}
        todaysPaid={data?.otherData?.todaysPaid?.paidAmount || 0}
        todayPendingPayment={data?.otherData?.todayPendingPayment?.pendingAmount || 0}

        />
      }
      
      
    </div>
  )
}

export {ReceptionistPayments}