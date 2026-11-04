import React from "react";

import { GeneralSearcher } from "./GeneralComponents/GeneralSearcher";
import { useSelector } from "react-redux";
import { ErrorMessage } from "../utils/ErrorMessage";



function Searcher() {

    const 
    {
        userData,
        isAuthorized,
        isLoading
    }
    = useSelector(state => state.userReducer.userInfo)
    const role = userData?.role


    if(isAuthorized && !isLoading && userData?._id)
    {
        return (
        <GeneralSearcher
        showCellNo={role !== "patient" ? true : false}
        showEmail={role !== "patient" ? true : false}
        showPatientName={role !== "patient" ? true : false}
        showSelectDoctor={role !== "doctor" ? true : false}
        />
    )
    }
    else
    {
        return (
        <ErrorMessage
        message="Please login to access this page"
        />
    )
    }
}


export { Searcher }