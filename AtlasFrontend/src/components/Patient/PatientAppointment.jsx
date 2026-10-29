
import {
  CalendarDays,
  Clock3,
  Stethoscope,
  ChevronRight,
  Plus,
  CheckCircle2,
  Clock4,
  XCircle,
  UserRound,
  ArrowRight,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAxios } from "../../useAxios";
import { PatientHistoryCard } from "./utils/PatientHistoryCard";
import {PendingAppointmentCards} from "./utils/TodaysAppointment";
import {CustomButton} from "../../utils/CustomButton";
import { ErrorMessage } from "../../utils/ErrorMessage";
import {Loading} from "../../utils/Loading";
import { DoneAppointmentCards } from "./utils/DoneAppointmentCards";
import { useNavigate } from "react-router-dom";

const appointmentTabs = [
  "Pending",
  "Completed",
];


function PatientAppointments() {

  const [selectedTab, setSelectedTab] = useState("Pending")
  const navigate = useNavigate()

  let { data, error, loading, request, setError } = useAxios()
  const RTKUser = useSelector(state => state.userReducer.userInfo)

  console.log("RTK User: ", RTKUser);
  


  const fetchHomeDetails = async () => {
    if (!RTKUser?.userData?.userProfileId) {
      setError("Failed to get your profile, please login to perform this action")
      return;
    }


    await request("/appointments/get-patient-appointments", "post", { userProfileId: RTKUser?.userData?.userProfileId })



  }

  useEffect(() => {
    if (!RTKUser?.userData?.userProfileId) 
    {
      setError("There is no user provided");
    }
    fetchHomeDetails()
  }, [RTKUser])

  

  return (
    <div className="space-y-6">

      {
        loading &&
        (<Loading />)
      }

      <section className="
        flex flex-col
        sm:flex-row
        sm:items-center
        sm:justify-between
        gap-4
      ">

        <div>
          <p className="text-sm font-medium text-emerald-700">
            Appointments
          </p>

          <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900">
            My Appointments
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            View your appointments or book a new visit with a doctor.
          </p>
        </div>


        {/* Booking Button */}
        <button
          onClick={() => navigate("/book-appointment")}
          type="button"
          className="
            inline-flex items-center justify-center gap-2
            px-4 py-2.5
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

      </section>


      <section className="
        bg-white
        border border-gray-100
        rounded-2xl
        shadow-sm
        p-2
      ">

        <div className="
          flex
          gap-1
          overflow-x-auto
          scrollbar-none
        ">

          {appointmentTabs.map((tab) => (
            <button
              onClick={() => setSelectedTab(tab)}
              key={tab}
              type="button"
              className={`
                shrink-0
                px-4 py-2.5
                rounded-xl
                text-sm font-medium
                transition
                ${
                  selectedTab === tab
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }
              `}
            >
              {tab}
            </button>
          ))}

        </div>

      </section>


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
        !loading && data && selectedTab == "Pending" &&
        <div>
          <PendingAppointmentCards
          label="Pending Appointments"
          message="The appointments comming in future"
          appointments={data?.pendingAppointments}
          />
        </div>
      }
      {
        !loading && data && selectedTab == "Completed" &&
        <div>
          <DoneAppointmentCards
          sessionCards={data?.doneAppointments}
          />
        </div>
      }


      <section className="
        bg-white
        rounded-2xl
        border border-gray-100
        shadow-sm
        overflow-hidden
      ">



      </section>

    </div>
  );
}

export {PatientAppointments}
