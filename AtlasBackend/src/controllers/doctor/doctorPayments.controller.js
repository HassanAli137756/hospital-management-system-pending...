
import mongoose from "mongoose";
import { User } from "../../models/User.model.js";
import { APIError } from '../../utils/apiError.js'
import { APIResponse } from '../../utils/apiResponse.js'
import { asyncHandler } from '../../utils/asyncHander.js'
import { Appointment } from "../../models/Appointment.model.js";


const doctorPaymentDetails = asyncHandler(async (req, res) => {
    const requester = req.user
    const
        {
            doctorId,
            starting,
            ending
        } = req.body




    if (!requester?._id || !doctorId) {
        throw new APIError(400, "Please provide requester and user doctor IDs")
    }

    if (!ending || !starting) {
        throw new APIError(400, "Please provide starting and ending dates")
    }

    const input = new Date().toLocaleDateString("en-CA")
    const now = new Date()

    let startingInput = new Date(starting).toLocaleDateString("en-CA");
    let endingInput = new Date(ending).toLocaleDateString("en-CA");

    let GeneralStartingDate = new Date(startingInput + "T00:00:00.000Z");
    let GeneralEndingDate = new Date(endingInput + "T23:59:59.999Z");
    let todayStartingDate = new Date(input + "T00:00:00.000Z");
    let todayEndingDate = new Date(input + "T23:59:59.999Z");
    let monthlyStartingDate = new Date(input + "T00:00:00.000Z");
    let monthlyEndingDate = new Date(input + "T23:59:59.999Z");


    monthlyStartingDate.setDate(0)
    monthlyEndingDate.setFullYear(now.getFullYear(), now.getMonth() + 1, 0)


    console.log("todayStarting: ", todayStartingDate);
    console.log("todayEndingDate: ", todayEndingDate);
    console.log("GeneralStartingDate: ", GeneralStartingDate);
    console.log("GeneralEndingDate: ", GeneralEndingDate);
    console.log("monthlyStartingDate: ", monthlyStartingDate);
    console.log("monthlyEndingDate: ", monthlyEndingDate);



    const paymentDetails = await Appointment.aggregate(
        [
            {
                $match: {
                    doctor: new mongoose.Types.ObjectId(doctorId)
                }

            },
            {
                $facet:
                {
                    netTotal:
                        [
                            {
                                $match:
                                {
                                    $expr: {
                                        $and:
                                            [
                                                { $eq: ["$paymentStatus", "paid"] },
                                                
                                                { $gte: ["$times.date", GeneralStartingDate] },

                                                { $lt: ["$times.date", GeneralEndingDate] }
                                            ]

                                    }
                                }
                            },
                            {
                                $group:
                                {
                                    _id: null,
                                    paidAmount: { $sum: "$paymentSection.paid" }
                                }
                            }
                        ],
                    physioTotal:
                        [
                            {
                                $match:
                                {
                                    $expr: {
                                        $and:
                                            [
                                                { $eq: ["$paymentStatus", "paid"] },
                                                { $eq: ["$forSession", "physiotherapy"] },
                                                
                                                { $gte: ["$times.date", GeneralStartingDate] },

                                                { $lt: ["$times.date", GeneralEndingDate] }
                                            ]

                                    }
                                }
                            },
                            {
                                $group:
                                {
                                    _id: null,
                                    paidAmount: { $sum: "$paymentSection.paid" }
                                }
                            }
                        ],
                    dryNeedlingTotal:
                        [
                            {
                                $match:
                                {
                                    $expr: {
                                        $and:
                                            [
                                                { $eq: ["$paymentStatus", "paid"] },
                                                { $eq: ["$forSession", "dryNeedling"] },
                                                
                                                { $gte: ["$times.date", GeneralStartingDate] },

                                                { $lt: ["$times.date", GeneralEndingDate] }
                                            ]

                                    }
                                }
                            },
                            {
                                $group:
                                {
                                    _id: null,
                                    paidAmount:
                                    {
                                        $sum:
                                        {
                                            $ifNull: ["$paymentSection.paid", 0]
                                        }
                                    }
                                }
                            }
                        ],
                    checkUpTotal:
                        [
                            {
                                $match:
                                {
                                    $expr: {
                                        $and:
                                            [
                                                { $eq: ["$paymentStatus", "paid"] },
                                                { $eq: ["$forSession", "checkUp"] },
                                                
                                                { $gte: ["$times.date", GeneralStartingDate] },

                                                { $lt: ["$times.date", GeneralEndingDate] }
                                            ]

                                    }
                                }
                            },
                            {
                                $group:
                                {
                                    _id: null,
                                    paidAmount: { $sum: "$paymentSection.paid" }
                                }
                            }
                        ],
                    cuppingTotal:
                        [
                            {
                                $match:
                                {
                                    $expr: {
                                        $and:
                                            [
                                                { $eq: ["$paymentStatus", "paid"] },
                                                { $eq: ["$forSession", "cupping"] },
                                                
                                                { $gte: ["$times.date", GeneralStartingDate] },

                                                { $lt: ["$times.date", GeneralEndingDate] }
                                            ]

                                    }
                                }
                            },
                            {
                                $group:
                                {
                                    _id: null,
                                    paidAmount: { $sum: "$paymentSection.paid" }
                                }
                            }
                        ],
                    monthlyPaid:
                        [
                            {
                                $match:
                                {
                                    $expr: {
                                        $and:
                                            [
                                                { $eq: ["$paymentStatus", "paid"] },

                                                { $gte: ["$times.date", monthlyStartingDate] },

                                                { $lt: ["$times.date", monthlyEndingDate] }
                                            ]

                                    }
                                }
                            },
                            {
                                $group:
                                {
                                    _id: null,
                                    paidAmount: { $sum: "$paymentSection.paid" }
                                }
                            }
                        ],
                    todaysPaid:
                        [
                            {
                                $match:
                                {
                                    $expr: {
                                        $and:
                                            [
                                                { $eq: ["$paymentStatus", "paid"] },

                                                { $gte: ["$times.date", todayStartingDate] },

                                                { $lt: ["$times.date", todayEndingDate] }
                                            ]

                                    }
                                }
                            },
                            {
                                $group:
                                {
                                    _id: null,
                                    paidAmount: { $sum: "$paymentSection.paid" }
                                }
                            }
                        ],
                    todayPendingPayment:
                        [
                            {
                                $match:
                                {
                                    $expr: {
                                        $and:
                                            [
                                                { $eq: ["$paymentStatus", "pending"] },

                                                { $gte: ["$times.date", todayStartingDate] },

                                                { $lt: ["$times.date", todayEndingDate] }
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
                    netTotal:
                    {
                        $first: "$netTotal"
                    },
                    physioTotal:
                    {
                        $first: "$physioTotal"
                    },
                    dryNeedlingTotal:
                    {
                        $first: "$dryNeedlingTotal"
                    },
                    checkUpTotal:
                    {
                        $first: "$checkUpTotal"
                    },
                    cuppingTotal:
                    {
                        $first: "$cuppingTotal"
                    },
                    monthlyPaid:
                    {
                        $first: "$monthlyPaid"
                    },
                    todaysPaid:
                    {
                        $first: "$todaysPaid"
                    },
                    todayPendingPayment:
                    {
                        $first: "$todayPendingPayment"
                    },
                }
            },

            {
                $project:
                {
                    netTotal: 1,
                    physioTotal: 1,
                    dryNeedlingTotal: 1,
                    checkUpTotal: 1,
                    cuppingTotal: 1,
                    monthlyPaid: 1,
                    todaysPaid: 1,
                    todayPendingPayment: 1
                }
            }
        ]
    )

    return res
        .status(200)
        .json(
            new APIResponse(200, "Successfully fetched home information details", paymentDetails[0])
        )



})

export { doctorPaymentDetails }