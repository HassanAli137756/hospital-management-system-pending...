import React, { useEffect, useState } from "react";
import { SelectInput } from "../../utils/CustomSelectInput";
import { useAxios } from "../../useAxios";
import { Loading } from "../../utils/Loading";
import { ErrorMessage } from "../../utils/ErrorMessage";
import { ScreenBlankError } from "../../utils/ScreenBlankError";
import { CustomButton } from "../../utils/CustomButton";

export function DoctorList(
    {
        register = null,
        errors = null,
    }
) {
    const [doctorOptions, setdoctorOptions] = useState([{value: " ", label: "For all doctors"}])


    let { data, error, loading, request, setError, setData, setLoading } = useAxios()


    


    const fetchDoctors = async () => {

        await request("/doctors/get-all-doctor-times", "get")




    }

    useEffect(() => {
        fetchDoctors()
    }, [])

    useEffect(() => {
        if (data?.DBDoctors?.length > 0) {
            const readyDoctors = data?.DBDoctors.map(doc => ({ label: doc.fullName, value: doc?._id }))
            setdoctorOptions(prev => ([...prev, ...readyDoctors]))
        }

        



    }, [data])



    return (
        <div>
            {
                loading &&
                <Loading />
            }
            {
                error?.length > 0 &&
                <div >
                    <div className="flex justify-center" >
                        <div>
                            <ErrorMessage
                                message={error}
                            />
                            <CustomButton
                                name="Reload"
                                onClick={() => fetchDoctors()}
                            />
                        </div>
                    </div>
                </div>
            }

            {
                !loading && !error &&
                <SelectInput
                    isRequired={false}
                    label="Doctor"
                    name="doctor"
                    register={register}
                    error={errors}
                    placeholder="Select doctor"
                    options={doctorOptions}
                />
            }
        </div>
    )
}