import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

// export const createType = async () => {//вставить что передаем
//     const {data} = await $authHost.post('api/type', order)//вставить айпишник , поменять order на то что перердаем
//     return data
// }

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type') //вставить айпишник 
    return data
}
// export const createOrder = async () => { //вставить что передаем
//     const {data} = await $authHost.post('api/device', device) //вставить айпишник
//     return data
// }
// Аналогично
export const fetchOrders = async () => {
    const {data} = await $host.get('api/ads')
    return data
}

