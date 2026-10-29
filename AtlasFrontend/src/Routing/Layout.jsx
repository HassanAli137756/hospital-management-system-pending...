import React, { useEffect } from 'react'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'
import { useAxios } from '../useAxios'
import {Loading} from '../utils/Loading'
import { ScreenBlankError } from '../utils/ScreenBlankError'
import { ErrorMessage } from '../utils/ErrorMessage'
import {CustomButton} from '../utils/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { removeUserInfo, setUserInfo } from '../Redux/userSlice'
import { Login } from '../authServices/Login'
import { InternetError } from '../utils/InternetError'

function Layout() {
    const { data, error, loading, request } = useAxios()
    const dispatch = useDispatch()
    const fetchUser = async () => {
        await request("/users/get-current-user")

        

    }
    
    const userInfo = useSelector(
        state => state.userReducer.userInfo
    )


    
    



    useEffect(() => {
        fetchUser()
    }, [])


    useEffect(() => {
            

    }, [userInfo])

    useEffect(() => {
        
        if (!loading && data?.DBUser?._id) 
        {
            
            dispatch(setUserInfo(
                {
                    isLoadingUser: false,
                    isAuthorized: true,
                    userData: { ...data?.DBUser, userProfileId: data?.userProfileId }
                }
            ))
        }
        else if (!loading && !data?.DBUser?._id) 
        {
            dispatch(removeUserInfo())
        }
    }, [data])

    
    return (
        <div>
            {
                loading &&
                <Loading />
            }

            {
                !window.navigator.onLine &&
                <InternetError />
            }

            {
                !loading && window.navigator.onLine &&
                <div>
                    <Header />
                    <br />
                    <Outlet />
                </div>
            }

        </div>
    )
}

export { Layout }