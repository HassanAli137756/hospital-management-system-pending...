import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import "./App.css"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './Redux/store'
import App from './App'
import {Layout} from './Routing/Layout'



import {AdminLayout} from './Routing/AdminLayout'



import {PatientLayout} from './Routing/PatientLayout'
import {PatientAppointments} from './components/Patient/PatientAppointment'
import {PatientHistory} from './components/Patient/PatientHistory'
import {PatientHome} from './components/Patient/PatientHome'
import {PatientPayments} from './components/Patient/PatientPayments'


import {DoctorLayout} from './Routing/DoctorLayout'
import {DoctorAppointments} from './components/Doctor/DoctorAppointments'
import {DoctorHome} from './components/Doctor/DoctorHome'
import {DoctorPayments} from './components/Doctor/DoctorPayments'


import {ReceptionistLayout} from './Routing/ReceptionistLayout'
import {ReceptionistAppointments} from './components/Receptionist/ReceptionistAppointments'
import {ReceptionistHome} from './components/Receptionist/ReceptionistHome'
import {ReceptionistPayments} from './components/Receptionist/ReceptionistPayments'
import {ReceptionistSearcher} from './components/Receptionist/ReceptionistSearcher'




import { AuthorizedLayout } from './Routing/AuthorizedLayout'
import { BookAppointment } from './components/Appointment'
import { UpdatePassword } from './authServices/UpdatePassword'
import { UpdateProfile } from './authServices/UpdateProfile'


import { UnauthorizedLayout } from './Routing/UnauthorizedLayout'
import { Login } from './authServices/Login'
import { Register } from './authServices/Register'

const router = createBrowserRouter(

  createRoutesFromElements(


    <Route path='' element={<Layout />}>

      <Route element={<AuthorizedLayout />} >

        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        
      </Route>




      <Route element={<UnauthorizedLayout />} >

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
      </Route>




      <Route element={<PatientLayout />} >

        <Route path="/patient-appointment" element={<PatientAppointments />} />
        <Route path="/patient-history" element={<PatientHistory />} />
        <Route path="/patient-home" element={<PatientHome />} />
        <Route path="/patient-payments" element={<PatientPayments />} />

      </Route>





      <Route element={<DoctorLayout />} >

        <Route path="/doctor-appointment" element={<DoctorAppointments />} />
        <Route  path="/doctor-home" element={<DoctorHome />} />
        <Route path="/doctor-payment" element={<DoctorPayments />} />

      </Route>






      <Route element={<ReceptionistLayout />} >

        <Route path="/receptionist-appointment" element={<ReceptionistAppointments />} />
        <Route  path="/receptionist-home" element={<ReceptionistHome />} />
        <Route path="/receptionist-payment" element={<ReceptionistPayments />} />
        <Route path="/receptionist-searcher" element={<ReceptionistSearcher />} />

      </Route>






      <Route element={<AdminLayout />} >

        

      </Route>



    </Route>
  )
)



createRoot(
  document.getElementById('root')
).render(
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
)