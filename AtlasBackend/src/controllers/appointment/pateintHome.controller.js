
import mongoose from "mongoose";
import { User } from "../../models/User.model.js";
import {APIError} from '../../utils/apiError.js'
import {APIResponse} from '../../utils/apiResponse.js'
import {asyncHandler} from '../../utils/asyncHander.js'
import { Appointment } from "../../models/Appointment.model.js";


const patientDashboardDetails = asyncHandler( async(req, res) =>
{
    const requester = req.user
    const userProfileId = req.body


    if(!requester?._id || !userProfileId)
    {
        throw new APIError(400, "Please provide requester and user profile IDs")
    }

    const homeData = await Appointment.aggregate(
    [
            {
                $lookup:
                {
                    from: "appointments",
                    pipeline:
                    [
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $eq: ["$userProfileId", userProfileId]
                                }
                            }
                        },
                        {
                            $lookup:
                            {
                                from: "users",
                                localField: "doctor",
                                foreignField: "_id",
                                as: "doctor"/* ,
                                 
                                pipeline:
                                [
                                    {
                                        $addFields:
                                        {
                                            doctor:
                                            {
                                                $first: "$doctor"
                                            } 
                                        }
                                    },
                                    {
                                        $project:
                                        {
                                            userName: 1,
                                            avatar: 1
                                        }
                                    }
                                ] */
                            }
                        }
                    ],
                    as: "allAppointments"
                }
            },

            {
                $facet:
                {
                    pendingAppointments:
                    [
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $eq: ["$status", "pending"]
                                }
                            }
                        }
                    ],
                    doneAppointments:
                    [
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $eq: ["$status", "done"]
                                }
                            }
                        }
                    ],
                    paidPayments:
                    [
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $eq: ["$paymentStatus", "paid"],
                                }
                            }
                        },
                        {
                            $group:
                            {
                                _id: null,
                                paidAmount: {$sum: "$paymentSection.paid"} || 0
                            }
                        }
                    ],
                    pendingPayments:
                    [
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $eq: ["$paymentStatus", "pending"],
                                }
                            }
                        },
                        {
                            $group:
                            {
                                _id: null,
                                pendingAmount: {$sum: "$paymentSection.payable"} || 0
                            }
                        }
                    ],
                }
            },

            {
                $addFields:
                {
                    doneAppointmentsCounts:
                    {
                        $size: "$doneAppointments"
                    },
                }
            },

            {
                $project:
                {
                    pendingAppointments: 1,
                    doneAppointmentsCounts: 1,
                    pendingPayments: 1,
                    paidPayments: 1,
                    userName: 1,
                    fullName: 1,
                    avatar: 1,
                    physio: 1,
                    cupping: 1,
                    dryNeedling: 1,
                    checkup: 1,
                    totalCups: 1,
                }
            }
        ]
    )

    return res
    .status(200)
    .json(
        new APIResponse(200, "Successfully fetched home information details", homeData[0])
    )



} )

export {patientDashboardDetails}