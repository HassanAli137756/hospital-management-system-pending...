import React from "react";
import {Register} from './authServices/Register'
import { Login } from "./authServices/Login";
import { UpdatePassword } from "./authServices/UpdatePassword";
import { UpdateProfile } from "./authServices/UpdateProfile";
import { Logout } from "./authServices/Logout";
function App() {
 return(
  <div>
      <UpdateProfile />
    </div>
 )
}

export default App;