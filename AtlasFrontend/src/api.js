import axios from 'axios'

const api = await axios.create(
{
    baseURL: "http://localhost:3000/physiotherapy/v1",
    withCredentials: true
}
)


api.interceptors.response.use(


    (response) =>
    {
        return Promise.resolve(response)
    },


    async (err) =>
    {
        const originalRequest = err.config

        if(err?.response?.status === 401 && err?.response?.data?.message === "jwt have expired")
        {
            try 
            {
                await api.post("/users/refresh-tokens")


                return await api(originalRequest)


            } catch (error) {
                console.log("Error in catch of refreshing access token: Axios!!", error)

                return Promise.reject(error)
            }
        }
        else {
            console.log("Error in out of catch: Axios!!", err)

            return Promise.reject(err)
        }
    }
)

export {api}