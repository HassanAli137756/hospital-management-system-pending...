import React, { useEffect, useState } from 'react'
import TextInput from '../utils/TextInput'
import PasswordInput from '../utils/PasswordInput'
import { ImageInput } from '../utils/ImageInput'
import CustomButton from '../utils/CustomButton'
import { useForm } from 'react-hook-form'
import Loading from '../utils/Loading'
import { setUserInfo } from '../Redux/userSlice'
import {useDispatch} from 'react-redux'
import { useAxios } from '../useAxios'
import { ScreenBlankError } from '../utils/ScreenBlankError'
import { ErrorMessage } from '../utils/ErrorMessage'

function RegisterForm() {

  const { handleSubmit, formState: { errors }, register } = useForm()
  const dispatch = useDispatch()
  let {data, error, loading, request, setData, setError} = useAxios()

  const removeError = () =>
  {
    setTimeout(() => {
      setError("")
    }, 2500);
  }

  const createAccount = async (data) => {
    console.log("data: ", data?.["userName"]);

    if(
      [
        data?.["userName"],
        data?.["fullName"],
        data?.["email"],
        data?.["address"],
        data?.["cellNo"],
        data?.["password"],
        data?.["confirmPassword"],
      ].some(field => !field || field?.trim() == "")
    )
    {
      setError("Please provide all fields without extra blank spaces")
      return;
    }
    
    if( data?.["cellNo"].replace("-", "")?.length <= 10)
    {
      setError("Phone enter a corret Pakistani phone number")
      return;
    }
    
    if( data?.["password"].length <= 7)
    {
      setError("Password should have atleast 8 characters")
      return;
    }

    if( data?.["password"] !== data?.["confirmPassword"])
    {
      setError("Please enter correct confirm password")
      return;
    }

    const formData = new FormData()

    formData.append("userName", data["userName"])
    formData.append("fullName", data["fullName"])
    formData.append("email", data["email"])
    formData.append("address", data["address"])
    formData.append("cellNo", data["cellNo"])
    formData.append("password", data["password"])
    formData.append("avatar", data?.["avatar"]?.[0])


    await request("/users/user-register", "post", formData)


  }


  useEffect(() =>
  {
    if(!loading && data?._id)
    {
        dispatch(setUserInfo(
        {
            isLoadingUser: false,
            isAuthorized: true,
            userData: data,
        }))
    }
  }, [data, error, loading])
  

  return (
    <form
      onSubmit={handleSubmit(createAccount)}
      >

      {
        loading &&
        (<Loading />)
      }


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


      <div className="flex mb-3 items-start gap-3 pt-1">
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

      <br />
      {
        error?.length > 0 &&
        <ErrorMessage message={error} />
      }

    </form>
  )
}

export { RegisterForm }