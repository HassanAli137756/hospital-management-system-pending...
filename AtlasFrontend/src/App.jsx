import React from "react";
import {Register} from './authServices/Register'
import { Login } from "./authServices/Login";
import { UpdatePassword } from "./authServices/UpdatePassword";
import { UpdateProfile } from "./authServices/UpdateProfile";
import { Logout } from "./authServices/Logout";
import { GeneralDashboard } from "./utils/GeneralDashboard";
import Loading from "./utils/Loading";
function App() {
 return(
  <div className="flex justify-center">
      <Logout />
      <Login />
    </div>
 )
}

export default App;