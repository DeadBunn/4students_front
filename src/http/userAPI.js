import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email,login, password) => {
    const {data} = await $host.post('api/register', {email,login, password})
    localStorage.setItem('token', data.accesstoken)
    return jwt_decode(data.accesstoken)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/auth/login', {email, password})
    localStorage.setItem('token', data.accessToken)
    return jwt_decode(data.accessToken)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}