import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import { Login } from '../authServices/Login'
import { Layout } from './Layout'
import { Header } from './Header'
import {Loading} from '../utils/Loading'
import { ScreenBlankError } from '../utils/ScreenBlankError'
import { ErrorMessage } from '../utils/ErrorMessage'


function PatientLayout() {


    
    const {isLoadingUser, isAuthorized, userData} = useSelector(
        state => state.userReducer.userInfo
    )
    
    if (isLoadingUser) {

        return (
            <div>
                <Loading />
            </div>
        )

    }


    if (!isAuthorized) {

        return <Navigate to={'/login'} replace />

    }

    if (userData?._id && userData?.role == "patient") {

        return <Outlet />

    }


    return <ErrorMessage message='You are not allowed to access this page' />

}


export { PatientLayout }