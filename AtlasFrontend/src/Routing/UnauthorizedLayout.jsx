import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import { Login } from '../authServices/Login'
import { Layout } from './Layout'
import { Header } from './Header'
import {Loading} from '../utils/Loading'
import { ScreenBlankError } from '../utils/ScreenBlankError'
import { ErrorMessage } from '../utils/ErrorMessage'


function UnauthorizedLayout() {


    
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
    else if (!userInfo.userData?._id && !userInfo?.isAuthorized) {

        return <Outlet />

    }
}


export { UnauthorizedLayout }