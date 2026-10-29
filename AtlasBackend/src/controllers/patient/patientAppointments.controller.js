
import mongoose from "mongoose";
import { User } from "../../models/User.model.js";
import { APIError } from '../../utils/apiError.js'
import { APIResponse } from '../../utils/apiResponse.js'
import { asyncHandler } from '../../utils/asyncHander.js'
import { Appointment } from "../../models/Appointment.model.js";


const patientAppointmentsDetails = asyncHandler(async (req, res) => {
    const requester = req.user
    const userProfileId = req.body?.userProfileId


    if (!requester?._id || !userProfileId) {
        throw new APIError(400, "Please provide requester and user profile IDs")
    }

    const patinetAppointments = await Appointment.aggregate(
        [
            {
                $match: {
                    userProfileId: new mongoose.Types.ObjectId(userProfileId),
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
                        ]
                }
            },

            {
                $project:
                {
                    pendingAppointments: 1,
                    doneAppointments: 1,
                }
            }
        ]
    )

    return res
        .status(200)
        .json(
            new APIResponse(200, "Successfully fetched home information details", patinetAppointments[0])
        )



})

export { patientAppointmentsDetails }