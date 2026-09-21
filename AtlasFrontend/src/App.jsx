import React from "react";
import {Register} from './authServices/Register'
import { Login } from "./authServices/Login";
import { UpdatePassword } from "./authServices/UpdatePassword";
import { UpdateProfile } from "./authServices/UpdateProfile";
import { Logout } from "./authServices/Logout";
import { GeneralDashboard } from "./utils/GeneralDashboard";
function App() {
 return(
  <div>
      <GeneralDashboard />
    </div>
 )
}

export default App;