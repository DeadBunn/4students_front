import {$authHost, $host} from "./index";

// export const createType = async () => {//вставить что передаем
//     const {data} = await $authHost.post('api/type', order)//вставить айпишник , поменять order на то что перердаем
//     return data
// }

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type') //вставить айпишник 
    return data
}

export const createOrder = async (orderBody) => {
    const token = localStorage.getItem("token")

    const headers = {
        Authorization: `Bearer ${token}`
    };

    console.log("При отправке запроса: " + orderBody.title)

    const formData = new FormData()
    const orderBodyString = JSON.stringify(orderBody)
    formData.append("orderBody", orderBodyString)

    const {data} = await $authHost.post('api/ads', formData, {headers});
    return data;
};

export const requestToAd = async (adId) => {
    const token = localStorage.getItem("token")

    const headers = {
        Authorization: `Bearer ${token}`
    };


    const {data} = await $authHost.post('api/ads/request/' + adId, {headers});
    return data;
};
// Аналогично
export const fetchAllOrders = async (filter) => {
    console.log("Filter Object:", filter);
    const config = {
        params:
            {
                type: filter.type,
                title: filter.title
            }
    };

    const {data} = await $host.get('api/ads', config);
    return data;
};

export const fetchMyOrders = async (filter) => {
    const token = localStorage.getItem("token")

    const config = {
        params:
            {
                type: filter.type,
                title: filter.title
            },
        headers:
            {Authorization: `Bearer ${token}`}
    };

    const {data} = await $host.get('api/ads/my', config);
    return data;
};

export const fetchOrdersToCheck = async (filter) => {
    const token = localStorage.getItem("token")

    const config = {
        params:
            {
                type: filter.type,
                title: filter.title
            }
        ,
        headers:
            {Authorization: `Bearer ${token}`}
    };

    const {data} = await $host.get('api/moderators/ads', config);
    return data;
};

export const fetchRequestedOrders = async (filter) => {
    const token = localStorage.getItem("token")

    const config = {
        params:
            {
                type: filter.type,
                title: filter.title
            }
        ,
        headers:
            {Authorization: `Bearer ${token}`}
    };

    const {data} = await $host.get('api/ads/requested', config);
    return data;
};

export const approveAd = async (adId) => {
    const token = localStorage.getItem("token")

    const headers = {
        Authorization: `Bearer ${token}`
    };

    console.log(headers.Authorization)

    const { data } = await $host.put('api/moderators/approve/' + adId, {}, { headers });
    return data;
};

export const declineAd = async (adId) => {
    const token = localStorage.getItem("token")

    const headers = {
        Authorization: `Bearer ${token}`
    };

    const { data } = await $host.delete('api/moderators/delete/' + adId,  { headers });
    return data;
};

export const setExecutor = async (adId, executorId) => {
    const token = localStorage.getItem("token")

    const config = {
        params:
            {
                adId: adId,
                executorId: executorId
            }
        ,
        headers:
            {Authorization: `Bearer ${token}`}
    };
    const { data } = await $host.put('api/ads/set-executor', null, config);
    return data;
};

export const finishExecution = async (adId) => {
    const token = localStorage.getItem("token")

    const config = {
        headers:
            {Authorization: `Bearer ${token}`}
    };

    const { data } = await $host.put('api/ads/finish/' + adId, null, config);
    return data;
};