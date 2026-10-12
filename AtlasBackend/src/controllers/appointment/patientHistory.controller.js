
import mongoose from "mongoose";
import { User } from "../../models/User.model.js";
import { APIError } from '../../utils/apiError.js'
import { APIResponse } from '../../utils/apiResponse.js'
import { asyncHandler } from '../../utils/asyncHander.js'
import { Appointment } from "../../models/Appointment.model.js";


const patientHistoryDetails = asyncHandler(async (req, res) => {
    const requester = req.user
    const userProfileId = req.body?.userProfileId


    if (!requester?._id || !userProfileId) {
        throw new APIError(400, "Please provide requester and user profile IDs")
    }


    const presentDate = new Date()
    const weeklyStarting = new Date()
    const weeklyEnding = new Date()
    const monthlyLast = new Date(presentDate.getFullYear(), presentDate.getMonth() + 1, 0)
    const monthlyStart = new Date(presentDate.getFullYear(), presentDate.getMonth(), 1)

    weeklyStarting.setDate((presentDate.getDate() - presentDate.getDay() + 1))

    const difference = (presentDate.getDay() - weeklyStarting.getDay()) - 1

    weeklyEnding.setDate(weeklyStarting.getDate() + 5)


    const patientHistory = await Appointment.aggregate(

        [
            {
                $match: {
                    userProfileId: new mongoose.Types.ObjectId(userProfileId),
                    status: "done"
                }
            },
            {
                $lookup:
                {
                    from: "users",
                    localField: "doctor",
                    foreignField: "_id",
                    as: "doctor",

                    pipeline:
                        [
                            
                            {
                                $project:
                                {
                                    fullName: 1,
                                    avatar: 1
                                }
                            }
                        ]
                }
            },
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
                $facet: {
                    appointments: [
                        // Yahan tamam matching documents rahenge
                        {
                            $lookup: {
                                from: "appointments",
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: [
                                                    "$userProfileId",
                                                    new mongoose.Types.ObjectId(userProfileId)
                                                ]
                                            }
                                        }
                                    }
                                ],
                                as: "allAppointments"
                            }
                        }
                    ],
                    totalSessions: [
                        { $count: "count" }
                    ],
                    weeklyAppointments:
                        [
                            {
                                $match:
                                {
                                    $expr:
                                    {
                                        $and:
                                            [
                                                { $gte: ["$times.date", weeklyStarting] },
                                                { $lt: ["$times.date", weeklyEnding] }
                                            ]
                                    }
                                }
                            }
                        ],
                    monthlySessions:
                        [
                            {
                                $match:
                                {
                                    $expr:
                                    {
                                        $and:
                                            [
                                                { $gte: ["$times.date", monthlyStart] },
                                                { $lt: ["$times.date", monthlyLast] }
                                            ]
                                    }
                                }
                            }
                        ],
                }
            },
            {
                $addFields:
                {
                    monthlyTotalSessions:
                    {
                        $size: "$monthlySessions"
                    },
                    totalSessions:
                    {
                        $first: "$totalSessions"
                    }
                }
            },
            {
                $project:
                {
                    weeklyAppointments: 1,
                    totalSessions: 1,
                    monthlyTotalSessions: 1,
                }
            }
        ]

    )





    return res
        .status(200)
        .json(
            new APIResponse(200, "Successfully fetched home information details", patientHistory[0])
        )



})

export { patientHistoryDetails }