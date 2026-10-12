import React, { useEffect } from "react";
import { Register } from './authServices/Register'
import { Login } from "./authServices/Login";
import { UpdatePassword } from "./authServices/UpdatePassword";
import { UpdateProfile } from "./authServices/UpdateProfile";
import { Logout } from "./authServices/Logout";
import { GeneralDashboard } from "./utils/GeneralDashboard";
import Loading from "./utils/Loading";
import PatientHome from "./components/Patient/PatientHome";
import BookAppointment from "./components/Appointment";
import { useAxios } from "./useAxios";
import { useDispatch } from "react-redux";
import { setUserInfo } from "./Redux/userSlice";
import { ErrorMessage } from "./utils/ErrorMessage";
import PatientAppointments from "./components/Patient/PatientAppointment";
import PatientHistory from "./components/Patient/PatientHistory";
import CustomButton from "./utils/CustomButton";
import { useState } from "react";
import {SelectInput} from './utils/CustomSelectInput'

const componentOptions =
[
  {
    value: 'pHistory',
    label: 'Patient History'
  },
  {
    value: 'pHome',
    label: 'Patient Home'
  },
  {
    value: 'login',
    label: 'Login'
  },
  {
    value: 'register',
    label: 'Register'
  },
  {
    value: 'pAppointments',
    label: 'Patient Appointments'
  },
  {
    value: 'appointmentForm',
    label: 'Appointment Form'
  },
]


function App() {

  let { data, error, loading, request, setError, setData, setLoading } = useAxios()
  const dispatch = useDispatch()
  const [component, setComponent] = useState("pHistory")


  const fetchDoctors = async () => {

    await request("/users/get-current-user", "get")


    

  }


  useEffect(() => {
    fetchDoctors()
  }, [])

  useEffect(() => {
    console.log("data: ", data);
    if (data?.success && data?.statusCode == 200 || 201) {
      dispatch(setUserInfo(
        {
          isLoadingUser: false,
          isAuthorized: true,
          userData: { ...data?.DBUser, userProfileId: data?.userProfileId }
        }
      ))
    }

  }, [data])
  return (
    <div className="" >
      {
        loading &&
        <Loading />
      }
      {
        error.length > 0 &&
        <div>
          <ErrorMessage message={error} />
          <Login />
          <CustomButton name="reload" onClick={() => fetchDoctors()} />
        </div>
      }
      {
        !loading && data &&
        <div>
          
          <SelectInput
          onChange={(value) => setComponent(value)}
          name={"Select Component"}
          defaultValue="pHistory"
          options={componentOptions}

          />

          {
            component == "pHistory" &&
            <PatientHistory />
          }
          
          {
            component == "pHome" &&
            <PatientHome />
          }
          
          {
            component == "login" &&
            <Login />
          }
          
          {
            component == "register" &&
            <Register />
          }
          
          {
            component == "pAppointments" &&
            <PatientAppointments />
          }

          {
            component == "appointmentForm" &&
            <BookAppointment />
          }
          
          
        </div>
      }
    </div>
  )
}

export default App;