import React from 'react'
import TextInput from '../utils/TextInput'
import PasswordInput from '../utils/PasswordInput'
import { ImageInput } from '../utils/ImageInput'
import CustomButton from '../utils/CustomButton'
import { useForm } from 'react-hook-form'

function UpdateProfileForm(
{
    currentEmail="hassanali@gmail.com",
    currentFullName="Hassan Ali",
    currentAddres="Sabri colony Okara",
    currentPhoneNo="0323-7284316"
}
) {

    const { handleSubmit, formState: { errors }, register } = useForm()

    const updateProfile = (data) => {
        console.log("data: ", data);

    }


    return (
        <form
            onSubmit={handleSubmit(updateProfile)}
            className="space-y-5">

            {/* Important: connect these fields with react-hook-form later */}



            <TextInput
                defaultValue={currentFullName}
                errors={errors}
                name={"fullName"}
                register={register}
                lable='Full Name'
                placeholder='Enter your full name'
            />

            <TextInput
                defaultValue={currentEmail}
                errors={errors}
                name={"email"}
                register={register}
                lable='Email Address'
                placeholder='you@example.com'
            />

            <TextInput
                defaultValue={currentAddres}
                errors={errors}
                name={"address"}
                register={register}
                lable='Home Address'
                placeholder='home, street, colony, city'
            />


            <TextInput
                defaultValue={currentPhoneNo}
                errors={errors}
                name={"cellNo"}
                register={register}
                lable='Phone Number'
                placeholder='03XX XXXXXXX'
            />


            <ImageInput
                defaultImageSrc={"https://res.cloudinary.com/jdcjxvhd/image/upload/v1788344099/dzmdpezraj2tpya8airq.png"}
                errors={errors}
                name={"avatar"}
                register={register}
                label='Profile Photo'
                message='Add a photo to personalize your profile'
                refrence='Upload your profile picture'

            />


            <div className='flex justify-between gap-10'>
                <CustomButton
                    name='Cancel'
                    type='button'
                    isAllowedDefaultClasses={false}
                    classes='w-full h-11
                    rounded-lg
                    border border-gray-200
                    bg-white
                    text-sm font-medium text-gray-600
                    hover:bg-gray-50
                    hover:text-gray-800
                    hover:border-gray-300
                    active:bg-gray-100
                    transition-all duration-200
                    focus:outline-none
                    focus:ring-2 focus:ring-emerald-100'

                />
                <CustomButton
                    name='Update'
                    type='submit'

                />
            </div>

        </form>
    )
}

export { UpdateProfileForm }