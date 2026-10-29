import React, { useEffect } from "react";
import {
  CheckCircle2,
  Clock3,
  CreditCard,
  CalendarDays,
  UserRound,
  ArrowRight,
  WalletCards,
} from "lucide-react";
import {SummerCards} from "./utils/SummerCards";
import { useAxios } from "../../useAxios";
import { useSelector } from "react-redux";
import {PendingPaymentCards} from "./utils/PendingPaymentCards";
import {Loading} from "../../utils/Loading";
import { ErrorMessage } from "../../utils/ErrorMessage";
import {PendingAppointmentCards} from "./utils/TodaysAppointment";

const PatientPayments = () => {


  let { data, error, loading, request, setError } = useAxios()
  const RTKUser = useSelector(state => state.userReducer.userInfo)



  const fetchHomeDetails = async () => {
    if (!RTKUser?.userData?.userProfileId) {
      setError("Failed to get your profile, please login to perform this action")
      return;
    }


    await request("/appointments/get-patient-payments", "post", { userProfileId: RTKUser?.userData?.userProfileId })



  }

  useEffect(() => {
    if (!RTKUser?.userData?.userProfileId) 
    {
      setError("There is no user provided");
    }
    fetchHomeDetails()
  }, [RTKUser])


  return (
    <div className="min-h-full bg-gray-50/70 p-4 sm:p-6 lg:p-8"> <div className="mx-auto max-w-7xl space-y-6">


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

      {/* Page Header */}
      <div>
        <p className="mb-1 text-sm font-medium text-emerald-600">
          Financial Overview
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Payments
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Keep track of your session payments and outstanding dues.
        </p>
      </div>

      {/* Summary Cards */}


      {
        !loading && data &&
        <div>

          <SummerCards
            isAllowedDefaultClasses={false}
            classes="grid grid-cols-1 sm:grid-cols-3  gap-4"
            doneSessions={{ allowed: true, value: data?.doneAppointmentsCounts || 0 }}
            paidPayment={{ allowed: true, value: data?.paidPayments?.paidAmount || 0 }}
            pendingPayment={{ allowed: true, value: data?.pendingPayments?.pendingAmount || 0}}
          />

          <PendingPaymentCards
            pendingSessions={data?.pendingAppointments}
          />
        </div>
      }

    </div>

    </div>

  );
};

export { PatientPayments };
