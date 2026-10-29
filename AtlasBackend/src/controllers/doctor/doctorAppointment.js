
import mongoose from "mongoose";
import { User } from "../../models/User.model.js";
import { APIError } from '../../utils/apiError.js'
import { APIResponse } from '../../utils/apiResponse.js'
import { asyncHandler } from '../../utils/asyncHander.js'
import { Appointment } from "../../models/Appointment.model.js";


const doctorAppointmentDetails = asyncHandler(async (req, res) => {
    const requester = req.user
    const doctorId = req?.params?.doctorId





    if (!requester?._id || !doctorId) {
        throw new APIError(400, "Please provide requester and user doctor IDs")
    }


    const input = new Date().toLocaleDateString("en-CA")
    const now = new Date()


    let todayStartingDate = new Date(input + "T00:00:00.000Z");
    let todayEndingDate = new Date(input + "T23:59:59.999Z");

    console.log("todayStarting: ", todayStartingDate);
    console.log("todayEndingDate: ", todayEndingDate);



    const appointmentDetails = await Appointment.aggregate(
        [
            {
                $match: {
                    doctor: new mongoose.Types.ObjectId(doctorId),
                    "times.date":
                    {
                        $gte: todayStartingDate,
                        $lt: todayEndingDate
                    }
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
                    totalSessions:
                        [
                            {
                                $match:
                                {
                                    "times.date":
                                    {
                                        $gte: todayStartingDate,
                                        $lt: todayEndingDate
                                    }
                                }
                            }
                        ],
                    todaysPendingSessions:
                        [
                            {
                                $match:
                                {
                                    $expr: {
                                        $and:
                                            [
                                                { $eq: ["$paymentStatus", "pending"] },

                                            ]

                                    }
                                }
                            }
                        ],
                    todaysPendingPayment:
                        [
                            {
                                $match:
                                {
                                    $expr: {
                                        $and:
                                            [
                                                { $eq: ["$paymentStatus", "pending"] },

                                            ]

                                    }
                                }
                            },
                            {
                                $group:
                                {
                                    _id: null,
                                    pendingAmount: { $sum: "$paymentSection.payable" }
                                }
                            }
                        ]

                }
            },
            {
                $addFields:
                {

                    todaysPendingSessions:
                    {
                        $size: "$todaysPendingSessions"
                    },
                    todaysPendingPayment:
                    {
                        $first: "$todaysPendingPayment"
                    }
                }
            },

            {
                $project:
                {
                    totalSessions: 1,
                    todaysPendingSessions: 1,
                    todaysPendingPayment: 1
                }
            }
        ]
    )

    return res
        .status(200)
        .json(
            new APIResponse(200, "Successfully fetched home information details", appointmentDetails[0])
        )



})

export { doctorAppointmentDetails }