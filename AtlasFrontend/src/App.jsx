import React, { useEffect } from "react";
import { Register } from './authServices/Register'
import { Login } from "./authServices/Login";
import { UpdatePassword } from "./authServices/UpdatePassword";
import { UpdateProfile } from "./authServices/UpdateProfile";
import { Logout } from "./authServices/Logout";
import {Loading} from "./utils/Loading";
import {PatientHome} from "./components/Patient/PatientHome";
import {BookAppointment} from "./components/Appointment";
import { useAxios } from "./useAxios";
import { useDispatch } from "react-redux";
import { setUserInfo } from "./Redux/userSlice";
import { ErrorMessage } from "./utils/ErrorMessage";
import {PatientAppointments} from "./components/Patient/PatientAppointment";
import {PatientHistory} from "./components/Patient/PatientHistory";
import {CustomButton} from "./utils/CustomButton";
import { useState } from "react";
import {SelectInput} from './utils/CustomSelectInput'
import { GeneralPayments } from "./components/GeneralComponents/GeneralPayments";
import { PatientPayments } from "./components/Patient/PatientPayments";
import {DoctorAppointments} from './components/Doctor/DoctorAppointments'
import {DoctorHome} from './components/Doctor/DoctorHome'
import {DoctorPayments} from './components/Doctor/DoctorPayments'
import { ReceptionistHome } from "./components/Receptionist/ReceptionistHome";
import { ReceptionistAppointments } from "./components/Receptionist/ReceptionistAppointments";
import {ReceptionistPayments} from "./components/Receptionist/ReceptionistPayments";
import { Header } from "./Routing/Header";

const componentOptions =
[
  {
    value: 'dHome',
    label: 'Doctor Home'
  },
  {
    value: 'dAppointment',
    label: 'Doctor Appointment'
  },
  {
    value: 'dPayments',
    label: 'Doctor Payments'
  },
  
  
]

const patientComponentsOptions = 
[
  {
    value: 'pAppointment',
    label: 'Patient Appointment'
  },
  {
    value: 'pHome',
    label: 'Patient Home'
  },
  {
    value: 'pHistory',
    label: 'Patient History'
  },
  {
    value: 'pPayment',
    label: 'Patient Payments'
  }
]

let receptionistComponentsOptions = 
[
  {
    value: 'rHome',
    label: 'Receptionist Home'
  },
  {
    value: 'rAppointment',
    label: 'Receptionist Appointment'
  },
  {
    value: 'rPayment',
    label: 'Receptionist Payments'
  }
]


receptionistComponentsOptions = [...receptionistComponentsOptions, 
  {
    value: 'login',
    label: 'Login'
  },
  {
    value: 'register',
    label: 'Register'
  },
  {
    value: 'appointmentForm',
    label: 'Book Appointment'
  },]

function App() {

  let { data, error, loading, request, setError, setData, setLoading } = useAxios()
  const dispatch = useDispatch()
  const [component, setComponent] = useState("rPayment")


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
      <Header />
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
          
          <div className=" grid grid-cols-1 gap-4 lg:grid-cols-2 ">
              <SelectInput
              defaultValue="rPayment"
            onChange={(value) => setComponent(value)}
            label={"Receptionist Component"}
            options={receptionistComponentsOptions}
  
            />
            <SelectInput
          onChange={(value) => setComponent(value)}
          label={"Doctor Components"}
          options={componentOptions}

          />
          {/* <br />
            <SelectInput
          onChange={(value) => setComponent(value)}
          label={"Patient Component"}
          options={patientComponentsOptions}

          /> */}
          </div>

          <br />

          {
            component == "dHome" &&
            <DoctorHome />
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
            component == "dAppointment" &&
            <DoctorAppointments />
          }

          {
            component == "appointmentForm" &&
            <BookAppointment />
          }

          {
            component == "dPayments" &&
            <DoctorPayments
            />
          }

          {
            component == "pAppointment" &&
            <PatientAppointments
            />
          }
          

          {
            component == "pPayment" &&
            <PatientPayments
            />
          }
          

          {
            component == "pHistory" &&
            <PatientHistory
            />
          }
          

          {
            component == "pHome" &&
            <PatientHome
            />
          }
          

          {
            component == "rHome" &&
            <ReceptionistHome
            />
          }
          

          {
            component == "rAppointment" &&
            <ReceptionistAppointments
            />
          }
          
          {
            component == "rPayment" &&
            <ReceptionistPayments
            />
          }
          
          
        </div>
      }
    </div>
  )
}

export default App;