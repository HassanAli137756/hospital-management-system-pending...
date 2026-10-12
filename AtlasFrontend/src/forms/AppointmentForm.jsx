import React, { useEffect, useState } from 'react'
import TextInput from '../utils/TextInput'
import PasswordInput from '../utils/PasswordInput'
import { ImageInput } from '../utils/ImageInput'
import CustomButton from '../utils/CustomButton'
import { useForm } from 'react-hook-form'
import { useAxios } from '../useAxios'
import Loading from '../utils/Loading'
import { ErrorMessage } from '../utils/ErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo } from '../Redux/userSlice'
import { SelectInput } from '../utils/CustomSelectInput'
import TimeSelection from '../utils/Times'
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

function AppointmentForm(
    {
        doctorsList = [],
        doctorTimes = [],
    }
) {
    const RTKUser = useSelector(state => state.userReducer.userInfo)
    const { handleSubmit, formState: { errors }, register } = useForm()
    const [selectedDoctor, setSelectedDoctor] = useState()
    const [msg, setMsg] = useState("")
    const [doctor, setDoctors] = useState([])
    const [date, setDate] = useState(new Date().toLocaleDateString())
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
        const targettedTimes = doctorTimes.filter(doc => doc?.fullName?.toLowerCase() == doctor?.toLowerCase())

        setDoctorId(targettedTimes?.[0]?._id)
        setTimes(targettedTimes?.[0]?.doctorField?.times)

    }

    const bookTime = async (data) => {

        if(!RTKUser?.userData?.userProfileId)
        {
            setError("Please provide user profile id")
            return;
        }
        if (
            [
                doctorId,
                data?.["patientName"],
                data?.["cellNo"],
                data?.["day"],
                data?.["time"],
            ].some(field => !field || field?.trim() == "")
        ) {
            setError("Please provide all required fields without extra blank spaces")
            return;
        }

        data = {...data, doctor: doctorId, date, profileId: RTKUser?.userData?.userProfileId}

        console.log("data: ", data);

        await request("/appointments/add-appointment", "post", data)

        if(data?.success && data?.statusCode == 200 || 201)
        {
            setMsg("Successfully booked appointment")
            removeMsg()


        }



    }



    useEffect(() => {
        if (!(doctor.length > 0)) {
            const readyDoctors = doctorsList.map(doc => ({ label: doc, value: doc?.toLowerCase() }))
            setDoctors(readyDoctors)
            setSelectedDoctor(readyDoctors?.[0]?.value)
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

        console.log("difference: ", difference);
        

        presentDate.setDate(presentDate.getDate() + difference)

        console.log("date: ", presentDate);
        

        setDate(presentDate.toLocaleDateString())

    }, [selectedDay])






    


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
                defaultValue={RTKUser?.userData?.fullName}
                errors={errors}
                name={"patientName"}
                register={register}
                lable='Patient Name'
                placeholder="Enter patient's name"
            />

            <br />

            <TextInput
                defaultValue={RTKUser?.userData?.email}
                errors={errors}
                name={"email"}
                isRequired={false}
                register={register}
                lable='Email'
                placeholder="Enter patient's email"
            />
            <br />

            <TextInput
                defaultValue={RTKUser?.userData?.cellNo}
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


            <SelectInput
                defaultValue={sessionTypes[0]?.value}
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
                    onChange={(doc) => setSelectedDoctor(doc)}
                    defaultValue={doctor?.[0]?.value}
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