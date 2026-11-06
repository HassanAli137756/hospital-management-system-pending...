import React from "react";

import { UpdateAppointment } from "./forms/UpdateAppointment";
import { BookAppointment } from "./components/Appointment";
export function App()
{
  
  return(
  <div>
    <BookAppointment
    isForUpdation={true}
    />
  </div>
  )
}