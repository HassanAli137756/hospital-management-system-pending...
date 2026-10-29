
import mongoose from "mongoose";
import { User } from "../../models/User.model.js";
import { APIError } from '../../utils/apiError.js'
import { APIResponse } from '../../utils/apiResponse.js'
import { asyncHandler } from '../../utils/asyncHander.js'
import { Appointment } from "../../models/Appointment.model.js";


const receptionistHomeDetails = asyncHandler(async (req, res) => {
    const requester = req.user


    

    if (!requester?._id) {
        throw new APIError(400, "Please provide requester Id")
    }

    const present = new Date()

    const today = new Date(present).toISOString().slice(0, 10);

    let input = new Date().toLocaleDateString("en-CA");

    let startingDate = new Date(input + "T00:00:00.000Z");

    let endingDate = new Date(input + "T23:59:59.999Z");

    console.log("Starting:", startingDate);

    console.log("Ending:", endingDate);


    const allDoctors = await User
    .find({role: "doctor"})
    .select("fullName doctorField.onDuty avatar")



    const homeData = await Appointment.aggregate(
        [
            {
                $match: {
                    "times.date": {
                        $gte: startingDate,
                        $lt: endingDate
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
                    allAppointments:
                        [
                            {
                                $match:
                                {
                                    "times.date": {
                                        $gte: startingDate,
                                        $lt: endingDate
                                    }
                                }
                            }
                        ],
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
                    totalAppointmentCounts:
                    {
                        $size: "$allAppointments"
                    },
                    pendingAppointmentCounts:
                    {
                        $size: "$pendingAppointments"
                    },
                }
            },

            {
                $project:
                {
                    allAppointments: 1,
                    doneAppointmentsCounts: 1,
                    pendingPayments: 1,
                    paidPayments: 1,
                    totalAppointmentCounts: 1,
                    pendingAppointmentCounts: 1
                }
            }
        ]
    )

    return res
        .status(200)
        .json(
            new APIResponse(200, "Successfully fetched home information details", 
            {homeDetails: homeData[0], doctors: allDoctors})
        )



})

export { receptionistHomeDetails }