 import { useEffect, useState } from "react"
import {api} from './api'

const useAxios = () => {
  console.log("Request executed");
  

  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(500);

    const request = async (url, methode="get", body=null) => {
      try {
        
        setError("")
        setLoading(true)
        setData(null)

        const res = await api[methode](url, body);


        console.log("res: ", res);
        console.log("res: ", res?.data?.statusCode, res?.data?.success);
        
        if (
          res?.data?.statusCode == 200 || 201 && res?.data?.success 
        ) {
          setData(res?.data?.data)
        } else {
          
          setError("Something went wrong, please try again")
        }
        setStatusCode(res?.data?.statusCode)
        
      } catch (error) {
        console.log("Error in axios hook", error.response);
        setStatusCode(error?.response?.data?.statusCode)
        setError(error.response?.data?.errors?.[0] || "Something went wrong, please try again")
      }
      finally
      {
        setLoading(false)
      }
    };
    

    
  return {
    loading,
    error,
    data,
    request,
    setLoading,
    setData,
    setError,
    statusCode
  }
};

export { useAxios };