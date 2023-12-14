import React from "react";
import Icon from "../images/profile.png"
import Star from "../images/image.png"
import {finishExecution, setExecutor} from "../http/OrderApi";

const Person = ({user, order, isExecutor=false}) => {

    const handleSetExecutor = (userId) => {
        setExecutor(order.id, userId)
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