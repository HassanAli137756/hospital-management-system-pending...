import React from 'react'
import TextInput from '../utils/TextInput'
import PasswordInput from '../utils/PasswordInput'
import { ImageInput } from '../utils/ImageInput'
import CustomButton from '../utils/CustomButton'
import {useForm} from 'react-hook-form'
function RegisterForm() {

  const {handleSubmit, formState: {errors}, register} = useForm()

  const createAccount = (data) =>
  {
    console.log("data: ", data);
    
  }
  

  return (
    <form 
    onSubmit={handleSubmit(createAccount)}
    className="space-y-5">

              {/* Important: connect these fields with react-hook-form later */}

              
              <TextInput
              errors={errors}
              name={"userName"}
              register={register}
              lable='User Name'
              placeholder='User name should be unique'
              />
              
              <TextInput
              errors={errors}
              name={"fullName"}
              register={register}
              lable='Full Name'
              placeholder='Enter your full name'
              />

              <TextInput
              errors={errors}
              name={"email"}
              register={register}
              lable='Email Address'
              placeholder='you@example.com'
              />

              <TextInput
              errors={errors}
              name={"address"}
              register={register}
              lable='Home Address'
              placeholder='home, street, colony, city'
              />


              <TextInput
              errors={errors}
              name={"cellNo"}
              register={register}
              lable='Phone Number'
              placeholder='03XX XXXXXXX'
              />

              

              <PasswordInput
              errors={errors}
              name={"password"}
              register={register}
              lable='Password'
              placeholder='Enter your password'
              />
              
              <PasswordInput
              errors={errors}
              name={"confirmPassword"}
              register={register}
              lable='Confirm Password'
              placeholder='Confirm your password'
              />

              <ImageInput
              errors={errors}
              name={"avatar"}
              register={register}
              label='Profile Photo'
              message='Add a photo to personalize your profile'
              refrence='Upload your profile picture'

              />


              <div className="flex items-start gap-3 pt-1">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 accent-emerald-700"
                />

                <p className="text-sm text-gray-500 leading-5">
                  I agree to the{" "}
                  <button
                    type="button"
                    className="text-emerald-700 font-medium hover:underline"
                  >
                    Terms & Conditions
                  </button>{" "}
                  and privacy policy.
                </p>
              </div>

              <CustomButton
              name='Create Account'
              type='submit'

              />

            </form>
  )
}

export {RegisterForm}