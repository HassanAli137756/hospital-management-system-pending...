
import mongoose from "mongoose";
import { User } from "../models/User.model.js";
import { APIError } from '../utils/apiError.js'
import { APIResponse } from '../utils/apiResponse.js'
import { asyncHandler } from '../utils/asyncHander.js'
import { Appointment } from "../models/Appointment.model.js";


const patientHistoryDetails = asyncHandler(async (req, res) => {
    const requester = req.user
    const userProfileId = req.body?.userProfileId


    if (!userProfileId) {
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

    weeklyStarting.setHours(0, 0, 0, 0)
    weeklyEnding.setHours(1, 1, 1, 1)

    console.log("weeklyStarting: ", weeklyStarting);
    console.log("weeklyEnding: ", weeklyEnding);
    


    const patientHistory = await Appointment.aggregate(

        [
            {
                $match: {
                    userProfileId: new mongoose.Types.ObjectId(userProfileId)
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
                                    userName: 1,
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
            new APIResponse(200, "Successfully fetched home information details", patientHistory)
        )



})


const makeTimesAvaialble = asyncHandler(async (req, res) => {
    const
        {
            doctorId,
            day = "all"
        } = req.body




    if (!doctorId) {
        throw new APIError(401, "Please provide doctorId")
    }


    const DBDoctor = await User.findById(doctorId).select("_id doctorField")

    if (!DBDoctor?._id) {
        throw new APIError(500, "Failed to fetch doctor from database")
    }

    DBDoctor.doctorField.times[day?.toLowerCase()] =
        DBDoctor.doctorField.times[day?.toLowerCase()].map(item => ({ ...item, availability: true }))

    await DBDoctor.save({ validateBeforeSave: false })

    return res
        .status(201)
        .json(
            new APIResponse(201, "Successfully sure times are avialable", DBDoctor)
        )



})



export { patientHistoryDetails, makeTimesAvaialble }