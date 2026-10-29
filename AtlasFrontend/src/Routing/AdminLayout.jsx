import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import { Login } from '../authServices/Login'
import { Layout } from './Layout'
import { Header } from './Header'
import {Loading} from '../utils/Loading'
import { ScreenBlankError } from '../utils/ScreenBlankError'


function AdminLayout() {


    
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


    if (!userInfo.isAuthorized) {

        return <Navigate to={'/login'} replace />

    }

    if (userInfo.userData?._id && userInfo.userData?.role == "admin") {

        return <Outlet />

    }


    return <ScreenBlankError msg='You are not allowed to access this page' />

}


export { AdminLayout }