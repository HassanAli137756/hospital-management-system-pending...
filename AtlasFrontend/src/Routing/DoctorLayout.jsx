import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import { Login } from '../authServices/Login'
import { Layout } from './Layout'
import { Header } from './Header'
import {Loading} from '../utils/Loading'
import { ScreenBlankError } from '../utils/ScreenBlankError'
import { ErrorMessage } from '../utils/ErrorMessage'


function DoctorLayout() {


    
    const userInfo = useSelector(
        state => state.userReducer.userInfo
    )


    console.log("We are in Doctor Layout");
    

    
    
    
    

    if (userInfo.isLoadingUser) {

        return (
            <div>
                <Loading />
            </div>
        )

    }
    else if (!userInfo.isAuthorized) {

        return <Navigate to={'/login'} replace />

    }
    else if (userInfo.userData?._id && userInfo.userData?.role == "doctor") {

        return <Outlet />

    }


    return <ErrorMessage message='You are not allowed to access this page' />

}


export { DoctorLayout }