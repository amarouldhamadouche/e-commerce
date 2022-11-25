import axios from 'axios'

const BaseUrl =  typeof window !== 'undefined' && `${window.location.origin}/api/`

const user = typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('persist:root'))?.user : ""
const currentUser = user && JSON.parse(user).currentUser
const token = currentUser?.accessToken

export const publicRequest = axios.create({
 baseURL:BaseUrl,
})

export const userRequest =  axios.create({
 baseURL:BaseUrl,
 headers:{token:token}
})
