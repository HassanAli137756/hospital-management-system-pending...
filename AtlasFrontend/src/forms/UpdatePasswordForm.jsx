import React from 'react'
import TextInput from '../utils/TextInput'
import PasswordInput from '../utils/PasswordInput'
import { ImageInput } from '../utils/ImageInput'
import CustomButton from '../utils/CustomButton'
import { useForm } from 'react-hook-form'
import { useAxios } from '../useAxios'
import Loading from '../utils/Loading'
import { ErrorMessage } from '../utils/ErrorMessage'

function UpdatePasswordForm() {

    const { handleSubmit, formState: { errors }, register } = useForm()

    let { data, error, loading, request, setData, setError } = useAxios()

    const removeError = () => {
        setTimeout(() => {
            setError("")
        }, 2500);
    }

    const updatePassword = async (data) => {

        if (
            [
                data?.["currentPassword"],
                data?.["newPassword"]
            ].some(field => !field || field?.trim() == "")
        ) {
            setError("Please provide all fields without extra blank spaces")
            return;
        }


        if (data?.["currentPassword"]?.length <= 7 || data?.["newPassword"]?.length <= 7) {
            setError("Both passwords must have alteast 8 characters")
            return;
        }


        await request("/users/update-password", "patch", data)


    }



    return (
        <form
            onSubmit={handleSubmit(updatePassword)}>

            {/* Important: connect these fields with react-hook-form later */}
            {
                loading &&
                (<Loading />)
            }

            <PasswordInput
                errors={errors}
                name={"currentPassword"}
                register={register}
                lable='Current Password'
                placeholder='Enter your current password'
            />



            <PasswordInput
                errors={errors}
                name={"newPassword"}
                register={register}
                lable='New Password'
                placeholder='Enter your new password'
            />


            <CustomButton
                name='Save'
                type='submit'
            />

            <br />
            {
                error?.length > 0 &&
                <ErrorMessage message={error} />
            }

        </form>
    )
}

export { UpdatePasswordForm }