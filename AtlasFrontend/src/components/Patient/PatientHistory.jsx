import React from "react";
import {
Activity,
CalendarDays,
Search,
Clock3,
Stethoscope,
ArrowRight,
CheckCircle2,
SlidersHorizontal,
} from "lucide-react";
import { PatientHistoryCard } from "./utils/PatientHistoryCard";
import { useAxios } from "../../useAxios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "../../utils/Loading";
import { ErrorMessage } from "../../utils/ErrorMessage";
import CustomButton from "../../utils/CustomButton";


   

const weeklySessions = [
{
id: 1,
doctor: "Dr. Ahmed Khan",
treatment: "Physiotherapy",
date: "Thursday, Oct 01",
time: "05:00 PM",
status: "Completed",
},
{
id: 2,
doctor: "Dr. Muhammad Ali",
treatment: "Cupping Therapy",
date: "Friday, Oct 02",
time: "06:30 PM",
status: "Completed",
},
{
id: 3,
doctor: "Dr. Usman",
treatment: "Dry Needling",
date: "Saturday, Oct 03",
time: "04:30 PM",
status: "Upcoming",
},
];

const PatientHistory = () => {

    let { data, error, loading, request, setError, setData, setLoading } = useAxios()
    const RTKUser = useSelector(state => state.userReducer.userInfo)
    
    

    const fetchHistory = async (data) => {
      setError("")
      if(!RTKUser?.userData?.userProfileId)
      {
        setError("please login to see your history")
        return ;
      }

        await request("/appointments/get-patient-history", "post", {userProfileId: RTKUser?.userData?.userProfileId})
    }


    useEffect(() =>
    {
      if(!RTKUser?.userData?.userProfileId) return;
      fetchHistory()
    }, [RTKUser])

    console.log("data", data);
    

return ( 
  <div>
    {
      loading &&
      <Loading />
    }
    {
      error.length > 0 &&
      (
        <div className="flex justify-center">
          <div>
            <ErrorMessage message={error} />
            <CustomButton name="Reload" onClick={() => fetchHistory()} />
          </div>
        </div>
      )
    }
    {
      !loading && data &&
      <PatientHistoryCard
        totalDoneSessions={data?.totalSessions?.count}
        weeklySessions={data?.weeklyAppointments}
        monthlyDoneSessions={data?.monthlyTotalSessions}
      />
    }
    
  </div>
);
};

export default PatientHistory;
