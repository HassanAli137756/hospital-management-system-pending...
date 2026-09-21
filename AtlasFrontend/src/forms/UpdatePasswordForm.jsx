import React from 'react'
import TextInput from '../utils/TextInput'
import PasswordInput from '../utils/PasswordInput'
import { ImageInput } from '../utils/ImageInput'
import CustomButton from '../utils/CustomButton'
import { useForm } from 'react-hook-form'

function UpdatePasswordForm() {

    const { handleSubmit, formState: { errors }, register } = useForm()

    const updatePassword = (data) => {
        console.log("data: ", data);

    }


    return (
        <form
            onSubmit={handleSubmit(updatePassword)}
            className="space-y-5">

            {/* Important: connect these fields with react-hook-form later */}


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

        </form>
    )
}

export { UpdatePasswordForm }