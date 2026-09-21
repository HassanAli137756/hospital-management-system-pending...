
import mongoose from "mongoose";
import { ApiResponse } from "../../../../../../BackendSeries/videoTube/Backend/src/utils/CustomResponse.js";
import { User } from "../../models/User.model.js";
import {APIError} from '../../utils/apiError.js'
import {APIResponse} from '../../utils/apiResponse.js'
import {asyncHandler} from '../../utils/asyncHander.js'
import { Appointment } from "../../models/Appointment.model.js";


const revenue = asyncHandler( async(req, res) =>
{
    //                 Flow
    /* 
        1. data validations
        2. apply aggregration
        3. first find doctor form Users based on doctor id
        4.     
    */

    const requester = req.user
    const 
    {
        forSession="",
        status="",
        starting,
        ending,
        doctorId
    } = req.body


    if(!requester?._id)
    {
        throw new APIError(400, "Please provide requester and doctor IDs")
    }

    const presentDate = new Date()
    const presentDay = presentDate.toLocaleDateString("en-US", {weekday: "long"})
    let startingDate = new Date()
    let endingDate = new Date(presentDate)
    
    if (starting?.length > 0 && ending?.length > 0 ) {
        if(presentDay == "tuesday")
        {
            startingDate.setDate(presentDate.getDate() - 1)
        }
        else if(presentDay == "wednesday")
        {
            startingDate.setDate(presentDate.getDate() - 2)
        }
        else if(presentDay == "thursday")
        {
            startingDate.setDate(presentDate.getDate() - 3)
        }
        else if(presentDay == "friday")
        {
            startingDate.setDate(presentDate.getDate() - 4)
        }
        else if(presentDay == "saturday")
        {
            startingDate.setDate(presentDate.getDate() - 5)
        }
    }


    if(starting?.trim()?.length > 0)
    {
        startingDate = new Date(starting)

    }

    if(ending?.trim()?.length > 0)
    {
        endingDate = new Date(ending)

    }
    startingDate.setHours(0, 0, 0, 0)

    endingDate.setDate(endingDate.getDate() + 1)
    endingDate.setHours(0, 0, 0, 0) 

    const conditions =
    [
        {
            $gte: ["$times.date", startingDate]
        },
        {
            $lt: ["$times.date", endingDate]
        },
    ]
    
    if(doctorId?.length > 0)
    {
        conditions.push(
        {
            $eq: ["$doctor", new mongoose.Types.ObjectId(doctorId)]
        },
        )
    }

    if(forSession?.length > 0)
    {
        conditions.push(
        {
            $eq: ["$forSession", forSession]
        },
        )
    }
    
    if(status?.length > 0)
    {
        conditions.push(
        {
            $eq: ["$status", status]
        },
        )
    }

    const revenueDetails = await Appointment.aggregate(
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
                                    $and: conditions
                                }
                            }
                        },
                        {
                            $project:
                            {
                                generalPatientInfo: 1,
                                times: 1,
                                forSession: 1,
                                payment: 1,
                            }
                        }
                    ],
                    as: "allAppointments"
                }
            },

            {
                $facet:
                {
                    physio:
                    [
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $eq: ["$forSession", "physio"]
                                }
                            }
                        },
                        {
                            $group:
                            {
                                _id: null,
                                physioCounts: {$sum: 1},
                                physiorevenue: {$sum: "$payment"},
                                physiodocs: {$push: "$$ROOT"}
                            }
                        }
                    ],
                    cupping:
                    [
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $eq: ["$forSession", "cupping"]
                                }
                            }
                        },
                        {
                            $group:
                            {
                                _id: null,
                                cuppingCounts: {$sum: 1},
                                cuppingrevenue: {$sum: "$payment"} || 0,
                                cuppingdocs: {$push: "$$ROOT"},
                                cups: {$sum: "$cups"}
                            }
                        }
                    ],
                    dryNeedling:
                    [
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $eq: ["$forSession", "dry-needling"]
                                }
                            }
                        },
                        {
                            $group:
                            {
                                _id: null,
                                dryDryNeedlingCounts: {$sum: 1},
                                dryDryNeedlingrevenue: {$sum: "$payment"} || 0,
                                dryDryNeedlingdocs: {$push: "$$ROOT"}
                            }
                        }
                    ],
                    checkup:
                    [
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $eq: ["$forSession", "checkup"]
                                }
                            }
                        },
                        {
                            $group:
                            {
                                _id: null,
                                checkupCounts: {$sum: 1},
                                checkuprevenue: {$sum: "$payment"} || 0,
                                checkupdocs: {$push: "$$ROOT"},
                            }
                        }
                    ]


                }
            },

            {
                $addFields:
                {
                    totalSessions:
                    {
                        $add: [
                            { $ifNull: [{ $arrayElemAt: ["$physio.physioCounts", 0] }, 0] },
                            { $ifNull: [{ $arrayElemAt: ["$checkup.checkupCounts", 0] }, 0] },
                            { $ifNull: [{ $arrayElemAt: ["$cupping.cuppingCounts", 0] }, 0] },
                            { $ifNull: [{ $arrayElemAt: ["$dryNeedling.dryDryNeedlingCounts", 0] }, 0] }
                        ]

                    },

                    totalRevenue: {
                        $add: [
                            { $ifNull: [{ $arrayElemAt: ["$physio.physiorevenue", 0] }, 0] },
                            { $ifNull: [{ $arrayElemAt: ["$cupping.cuppingrevenue", 0] }, 0] },
                            { $ifNull: [{ $arrayElemAt: ["$dryNeedling.dryDryNeedlingrevenue", 0] }, 0] },
                            { $ifNull: [{ $arrayElemAt: ["$checkup.checkuprevenue", 0] }, 0] }
                        ]
                    },

                    totalCups:
                    {
                        $sum: "allAppointments.cups"
                    }
                }
            },

            {
                $project:
                {
                    allAppointments: 1,
                    totalRevenue: 1,
                    totalSessions: 1,
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
        new ApiResponse(200, "Successfully fetched revenue details", revenueDetails)
    )



} )

export {revenue}