import React, { useEffect, useState } from 'react'
import {TextInput} from '../utils/TextInput'
import {PasswordInput} from '../utils/PasswordInput'
import { ImageInput } from '../utils/ImageInput'
import {CustomButton} from '../utils/CustomButton'
import { useForm } from 'react-hook-form'
import { useAxios } from '../useAxios'
import {Loading} from '../utils/Loading'
import { ErrorMessage } from '../utils/ErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo } from '../Redux/userSlice'
import { SelectInput } from '../utils/CustomSelectInput'
import {TimeSelection} from '../utils/Times'
import {ScreenBlankError} from '../utils/ScreenBlankError'

const sessionTypes = 
[
    {
        label: "Check up",
        value: "checkUp"
    },
    {
        label: "Physiotherapy",
        value: "physiotherapy"
    },
    {
        label: "Cupping",
        value: "cupping"
    },
    {
        label: "Dry Needling",
        value: "dryNeedling"
    },
]

const statusOptions = 
[
    {
        label: "Pending",
        value: "pending"
    },
    {
        label: "Completed",
        value: "done"
    }
]

function AppointmentForm(
    {
        providedDoctor,
        userProfile={},
        doctorsList = [],
        doctorTimes = [],
    }
) {

    
    const RTKUser = useSelector(state => state.userReducer.userInfo)
    const { handleSubmit, formState: { errors }, register } = useForm()
    const [selectedDoctor, setSelectedDoctor] = useState()
    const [msg, setMsg] = useState("")
    const [doctor, setDoctors] = useState([])
    const [date, setDate] = useState(new Date())
    const [doctorId, setDoctorId] = useState(null)
    const [times, setTimes] = useState({})
    const dispatch = useDispatch()
    let { data, error, loading, request, setError, setData, setLoading } = useAxios()
    const [selectedDay, setSelectedDay] = useState(new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase())

    const removeMsg = () => {
        setTimeout(() => {
            setMsg("")
        }, 500);
    }

    const setTime = (doctor) => {
        const targettedTimes = doctorsList.filter(doc => doc?._id == providedDoctor || doctor)

        console.log("targettedTimes", targettedTimes);
        

        setDoctorId(targettedTimes?.[0]?._id)
        setTimes(targettedTimes?.[0]?.doctorField?.times)

    }

    const bookTime = async (formData) => 
    {
        const profileId = RTKUser?.userData?.role == "patient" ? RTKUser?.userData?.userProfileId : userProfile?._id

        if(profileId)
        {
            setError("Please provide user profile id")
            return;
        }
        if (
            [
                doctorId,
                formData?.["patientName"],
                formData?.["cellNo"],
                formData?.["day"],
                formData?.["time"],
            ].some(field => !field || field?.trim() == "")
        ) {
            setError("Please provide all required fields without extra blank spaces")
            return;
        }

        formData = 
        {
            ...formData, 
            doctor: doctorId, 
            date: date.toLocaleDateString(), 
            profileId: profileId
        }


        await request("/appointments/add-appointment", "post", data)

        if(data?.success && (data?.statusCode == 200 || data?.statusCode == 201))
        {
            setMsg("Successfully booked appointment")
            removeMsg()


        }



    }



    useEffect(() => {
        if (!(doctor.length > 0)) {
            const readyDoctors = doctorsList.map(doc => ({ label: doc?.fullName, value: doc?._id }))
            setDoctors(readyDoctors)

            setSelectedDoctor(providedDoctor || readyDoctors?.[0]?.value)
            console.log("Provided Doctor: ", providedDoctor);
            
        }
        setTime(selectedDoctor)

        if(new Date().toLocaleDateString("en-US", {weekday: "long"}).toLowerCase() == "sunday")
        {
            setSelectedDay("monday")
        }

    }, [doctorsList, selectedDoctor])


    useEffect(() => {

        let presentDate = new Date()
        
        const daysNumbers =
        {
            "monday": 1,
            "tuesday": 2,
            "wednesday": 3,
            "thursday": 4,
            "friday": 5,
            "saturday": 6,
        }

        let difference = daysNumbers[selectedDay.toLocaleLowerCase()] - presentDate.getDay()

        

        presentDate.setDate(presentDate.getDate() + difference)

        

        setDate(presentDate)

    }, [selectedDay])




    console.log("Selected Doctor in AppointmentForm: ", selectedDoctor);
    


    


    return (
        <div className='relative'>
            {
                msg.length > 0 &&
                <ScreenBlankError
                msg={msg}
                />
            }
            <form
            className='relative'
            onSubmit={handleSubmit(bookTime)}>
            {
                loading &&
                (<Loading />)
            }

            <TextInput
                defaultValue={RTKUser?.userData?.role == "patient" ? RTKUser?.userData?.fullName : userProfile?.fullName}
                errors={errors}
                name={"patientName"}
                register={register}
                lable='Patient Name'
                placeholder="Enter patient's name"
            />

            <br />

            <TextInput
                defaultValue={RTKUser?.userData?.role == "patient" ? RTKUser?.userData?.email : userProfile?.email}
                errors={errors}
                name={"email"}
                isRequired={false}
                register={register}
                lable='Email'
                placeholder="Enter patient's email"
            />
            <br />

            <TextInput
                defaultValue={RTKUser?.userData?.role == "patient" ? RTKUser?.userData?.cellNo : userProfile?.cellNo}
                errors={errors}
                name={"cellNo"}
                register={register}
                lable='Phone Number'
                placeholder="Enter patient's phone number"
            />
            <br />

            <TextInput
                isRequired={false}
                errors={errors}
                name={"diagnoses"}
                register={register}
                lable='Diagnoses'
                placeholder="Briefly describe problem or diseases of patient"
            />
            <br />

                {
                    RTKUser?.userData?.role !== "patient" &&
                    (
                        <div>
                            <TextInput
                                type='Number'
                                defaultValue={1000}
                                isRequired={false}
                                errors={errors}
                                name={"payable"}
                                register={register}
                                lable='Payable Amount'
                                placeholder="Enter payable amount"
                            />
                            <br />

                            <TextInput
                                type='Number'
                                isRequired={false}
                                errors={errors}
                                name={"paid"}
                                register={register}
                                lable='Paid Amount'
                                placeholder="Enter paid amount"
                            />
                            <br />

                            
                            <SelectInput
                            defaultValue={'pending'}
                            options={statusOptions}
                            error={errors}
                            label={"Appointment Status"}
                            name={"status"}
                            register={register}
                            placeholder='Select an appointment status'
                            />
                            <br />
                        </div>
                    )
                }


                <SelectInput
                    defaultValue={userProfile?.forSession ? userProfile?.forSession :  sessionTypes[0]?.value}
                    options={sessionTypes}
                    error={errors}
                    label={"Select Session Type"}
                    name={"forSession"}
                    register={register}
                    placeholder='Select a session type for treatement'
                />

                <br />
                <div className=' grid grid-cols-1 sm:grid-cols-2 sm:gap-5 gap-5'>
                <SelectInput
                    defaultValue={providedDoctor || doctor?.[0]?.value}
                    onChange={(doc) => (setSelectedDoctor(doc))}
                    options={doctor}
                    error={errors}
                    label={"Select Doctor"}
                    name={"doctor"}
                    register={register}
                    placeholder='Select a doctor for your treatment'
                />
                <SelectInput
                    defaultValue={selectedDay.toLowerCase()}
                    onChange={(day) => (setSelectedDay(day))}
                    options={
                        [
                            {
                                value: "monday",
                                label: "Monday"
                            },
                            {
                                value: "tuesday",
                                label: "Tuesday"
                            },
                            {
                                value: "wednesday",
                                label: "Wednesday"
                            },
                            {
                                value: "thursday",
                                label: "Thursday"
                            },
                            {
                                value: "friday",
                                label: "Friday"
                            },
                            {
                                value: "saturday",
                                label: "Saturday"
                            }
                        ]}
                    error={errors}
                    label={"Select Day"}
                    name={"day"}
                    register={register}
                    placeholder='Select a day for your treatment'
                />


            </div>
            <br />


            <TimeSelection
                date={date.toLocaleDateString("en-US", {dateStyle: "medium"})}
                errors={errors}
                name='time'
                register={register}
                selectedDay={selectedDay}
                times={times}

            />

            <div className='flex mt-5 justify-end'>
                <div className='w-1/2'>
                    <CustomButton
                        name='Book'
                        type='submit'

                    />
                </div>
            </div>

            <br />
            {
                error?.length > 0 &&
                <ErrorMessage message={error} />
            }

        </form>
        </div>
    )
}

export { AppointmentForm }