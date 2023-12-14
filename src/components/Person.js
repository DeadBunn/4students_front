import React from "react";
import Icon from "../images/profile.png"
import Star from "../images/image.png"
import {finishExecution, setExecutor} from "../http/OrderApi";
import {toast} from "react-toastify";

const Person = ({user, order, isExecutor=false}) => {

    const handleSetExecutor = async (userId) => {
        try {
            const result = await setExecutor(order.id, userId)
            toast.success('Вы успешно назначили исполнителя', {position: toast.POSITION.TOP_LEFT});
        } catch (error) {
            toast.error(error.response?.data || 'Произошла ошибка во время назначения исполнителя', {position: toast.POSITION.TOP_LEFT});
        }
    }

    return (
        <div style={{display: "flex", alignItems: "center", margin: "10px"}}>
            <img alt="icon" src={Icon}></img>
            <div className="PersonName">@{user.login}</div>
            <div className="Raiting">{user.rating}</div>
            <img alt="starIcon" src={Star}></img>
            {!isExecutor && <button className="ButtonModal" onClick={() => handleSetExecutor(user.id)}
                     style={{marginLeft: "50px", width: "150px"}}>Выбрать
            </button>}
        </div>
    )
}

export default Person;