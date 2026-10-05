import React, { useEffect } from 'react'
import TextInput from '../utils/TextInput'
import PasswordInput from '../utils/PasswordInput'
import { ImageInput } from '../utils/ImageInput'
import CustomButton from '../utils/CustomButton'
import { useForm } from 'react-hook-form'
import { useAxios } from '../useAxios'
import Loading from '../utils/Loading'
import { ErrorMessage } from '../utils/ErrorMessage'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../Redux/userSlice'

function LoginForm() {

  const { handleSubmit, formState: { errors }, register } = useForm()
  const dispatch = useDispatch()
  let { data, error, loading, request, setError } = useAxios()

  const removeError = () => {
    setTimeout(() => {
      setError("")
    }, 2500);
  }

  const login = async (data) => {
    if (
      [
        data?.["userRefrence"],
        data?.["password"],
      ].some(field => !field || field?.trim() == "")
    ) {
      setError("Please provide all required fields without extra blank spaces")
      return;
    }

    if( data?.["password"].length <= 7)
    {
      setError("Password should have atleast 8 characters")
      return;
    }

    await request("/users/user-login", "post", data)


  }

  useEffect(() =>
  {
    console.log("User data of api: ", data);
    
    if(!loading && data?.user?._id)
    {
        dispatch(setUserInfo(
        {
            isLoadingUser: false,
            isAuthorized: true,
            userData: data?.["user"],
        }))
    }
  }, [data, error, loading])
  
  

  return (
    <form
      onSubmit={handleSubmit(login)}>

      
      {
        loading &&
        (<Loading />)
      }


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

      <br />
      {
        error?.length > 0 &&
        <ErrorMessage message={error} />
      }

    </form>
  )
}

export { LoginForm }