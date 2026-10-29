import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import { NoInternet } from '../utils/InternetError'
import { Login } from '../authServices/Login'
import { Layout } from './Layout'
import { Header } from './Header'
import {Loading} from '../utils/Loading'


function RegisterationLayout() {


    
    const userInfo = useSelector(
        state => state.userReducer.userInfo
    )
    
    if (userInfo.isLoadingUser) {

        return (
            <div>

                <Loading />
            </div>
        )

    }


    if (!userInfo.isAuthorized && !userInfo.userData?._id) {

        return <Outlet />

    }


    return <Navigate to={'/'} replace />

}


export { RegisterationLayout }