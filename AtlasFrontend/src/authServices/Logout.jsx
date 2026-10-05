
/* ****************** OKAY ****************** */

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../utils/Loading'
import { ErrorMessage } from '../utils/ErrorMessage'
import { useAxios } from '../useAxios'
import { removeUserInfo } from '../Redux/userSlice'

function Logout() {

  const [disable, setDisable] = useState(false)
  const RTKUser = useSelector(state => state.userReducer.userInfo)
  const dispatch = useDispatch()
  let {data, error, loading, request, setData, setError, statusCode} = useAxios()

  console.log("RTKUSER: ", RTKUser);
  

  const logout = async (data) => {
    if (!RTKUser?.userData?._id || !RTKUser?.isAuthorized) {
      setError("You have already logout")
      return;
    }

    await request("/users/user-logout", "post")


  }

  useEffect(() => {
    if (!loading && statusCode == 200 || 201) {
      dispatch(removeUserInfo())
    }
  }, [data, error, loading])




  return (
    <div>
      {
        loading &&
        (<Loading />)
      }

      <button
        disabled={disable}
        onClick={() => logout()}
        type="button"
        className="
    group w-full flex items-center gap-3
    px-3.5 py-2.5
    rounded-xl

    bg-red-50/60
    text-red-500

    hover:bg-red-100
    hover:text-red-600

    active:bg-red-200
    active:text-red-700
    active:scale-[0.98]

    transition-all duration-200

    focus:outline-none
    focus:ring-2
    focus:ring-red-100
  "
      >
        {/* Logout Icon */}
        <span
          className="
      w-9 h-9 shrink-0
      rounded-lg

      bg-red-100/70
      text-red-500

      group-hover:bg-red-200
      group-hover:text-red-600

      group-active:bg-red-300
      group-active:text-red-700

      flex items-center justify-center
      transition-all duration-200
    "
        >
          <svg
            className="w-[18px] h-[18px]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            <path
              d="M10 17l5-5-5-5"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M15 12H3"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>

        <span className="font-medium">
          Sign out
        </span>
      </button>

      <br />
      {
        error?.length > 0 &&
        <ErrorMessage message={error} />
      }

    </div>
  )
}

export { Logout }