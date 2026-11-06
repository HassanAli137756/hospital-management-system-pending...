
import mongoose from "mongoose";
import { User } from "../../models/User.model.js";
import { APIError } from '../../utils/apiError.js'
import { APIResponse } from '../../utils/apiResponse.js'
import { asyncHandler } from '../../utils/asyncHander.js'
import { Appointment } from "../../models/Appointment.model.js";


const patientDashboardDetails = asyncHandler(async (req, res) => {
    const requester = req.user
    const userProfileId = req.body?.userProfileId


    if (!requester?._id || !userProfileId) {
        throw new APIError(400, "Please provide requester and user profile IDs")
    }


    let input = new Date().toLocaleDateString("en-CA");

    let startingDate = new Date(input + "T00:00:00.000Z");

    let endingDate = new Date(input + "T23:59:59.999Z");



    const homeData = await Appointment.aggregate(
        [
            {
                $match: {
                    userProfileId: new mongoose.Types.ObjectId(userProfileId),
                }
            },
            {
                $sort: {
                    "times.date": -1
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
                $facet:
                {
                    todaysAppointments:
                        [
                            {
                                $match:
                                {
                                    $expr:
                                    {
                                        $and:
                                        [
                                            {$eq: ["$status", "pending"]},
                                            {$gte: ["$times.date", startingDate]},
                                            {$lt: ["$times.date", endingDate]},
                                        ]
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
                                    paidAmount: { $sum: "$paymentSection.paid" } || 0
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
                                    pendingAmount: { $sum: "$paymentSection.payable" } || 0
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
                    paidPayments:
                    {
                        $first: "$paidPayments"
                    },
                    pendingPayments:
                    {
                        $first: "$pendingPayments"
                    },
                }
            },

            {
                $project:
                {
                    todaysAppointments: 1,
                    doneAppointmentsCounts: 1,
                    pendingPayments: 1,
                    paidPayments: 1,
                }
            }
        ]
    )

    return res
        .status(200)
        .json(
            new APIResponse(200, "Successfully fetched home information details", homeData[0])
        )



})

export { patientDashboardDetails }