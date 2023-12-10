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
export const createOrder = async (orderBody) => {
    const { data } = await $authHost.post('api/ads', orderBody);
    return data;
};
// Аналогично
export const fetchOrders = async (filter) => {
    console.log("Filter Object:", filter);
    const config = {
        params:
            {
                type: filter.type,
                title: filter.title
            }
    };

    try{
        const { data } = await $host.get('api/ads', config);
        return data;
    }
    catch (error){
        console.error("Ошибка ошибка ошибка:", error.response.data);
        throw error;
    }

};