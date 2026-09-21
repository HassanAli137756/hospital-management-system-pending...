import React from 'react'
import TextInput from '../utils/TextInput'
import PasswordInput from '../utils/PasswordInput'
import { ImageInput } from '../utils/ImageInput'
import CustomButton from '../utils/CustomButton'
import {useForm} from 'react-hook-form'

function LoginForm() {

  const {handleSubmit, formState: {errors}, register} = useForm()

  const login = (data) =>
  {
    console.log("data: ", data);
    
  }
  

  return (
    <form 
    onSubmit={handleSubmit(login)}
    className="space-y-5">

              {/* Important: connect these fields with react-hook-form later */}

              
              <TextInput
              errors={errors}
              name={"userRefrence"}
              register={register}
              lable='User-Name/Email'
              placeholder='Enter user-name or email'
              />
              
              

              <PasswordInput
              errors={errors}
              name={"password"}
              register={register}
              lable='Password'
              placeholder='Enter your password'
              />
              
              <CustomButton
              name='Login'
              type='submit'

              />

            </form>
  )
}

export {LoginForm}