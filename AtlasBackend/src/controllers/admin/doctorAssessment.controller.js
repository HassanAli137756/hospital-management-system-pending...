
import mongoose from "mongoose";
import { User } from "../../models/User.model.js";
import {APIError} from '../../utils/apiError.js'
import {APIResponse} from '../../utils/apiResponse.js'
import {asyncHandler} from '../../utils/asyncHander.js'


const doctorAssessment = asyncHandler( async(req, res) =>
{
    //                 Flow
    /* 
        1. data validations
        2. apply aggregration
        3. first find doctor form Users based on doctor id
        4.     
    */

    const requester = req.user
    const doctorId = req.body?.doctorId
    const 
    {
        forSession="physio",
        status="done",
        starting,
        ending
    } = req.body


    if(!requester?._id || !doctorId)
    {
        throw new APIError(400, "Please provide requester and doctor IDs")
    }

    const presentDate = new Date
    let startingDate = new Date()
    let endingDate = new Date(presentDate)
    


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

    const doctorHistory = await User.aggregate(
    [
        {
            $match:
            {
                _id: new mongoose.Types.ObjectId(doctorId)
            }
        },

        {
            $lookup:
            {
                from: "appointments",
                let:
                {
                    doctor: "$_id",
                    startedDate: startingDate,
                    endedDate: endingDate,
                    forSession: forSession,
                    status: status
                },
                pipeline:
                [
                    {
                        $match:
                        {
                            $expr:
                            {
                                $and:
                                [
                                    {$eq: ["$doctor", "$$doctor"]},
                                    {$eq: ["$status", "$$status"]},
                                    {$eq: ["$forSession", "$$forSession"]},
                                    {$gte: ["$times.date", "$$startedDate"]},
                                    {$lt: ["$times.date", "$$endedDate"]},
                                ]
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
            $addFields:
            {
                totalSessions:
                {
                    $size: "$allAppointments"
                },

                totalRevenue:
                {
                    $sum: "$allAppointments.payment"
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
            }
        }
    ]
    )

    console.log("Starting Date: ", new Date(startingDate))
    console.log("Ending Date: ", new Date(endingDate))

    return res
    .status(200)
    .json(
        new ApiResponse(200, "Successfully fetched doctor assessments", doctorHistory)
    )



} )

export {doctorAssessment}