import React, {useContext, useState} from "react";
import Image from "../images/image.png"
import Coin from "../images/coin.png"
import Modal from "./Modal";
import "../styles/Modal.css"
import {approveAd, declineAd, requestToAd} from "../http/OrderApi";
import {Context} from "../index";

const Item = ({order}) => {

    const {id, type, title, description, user, tags, price, isModerated} = order;
    const {userRole} = useContext(Context)

    const colors = ['#2eb87e66', '#ff5733', '#5c33ff', '#ffaa00']; // Add more colors as needed
    const [modalActive, setModalActive] = useState(false)
    const [userId, setUserId] = useState(localStorage.getItem('userId'))

    const handleRequest = (adId) => {
        requestToAd(adId);
        setModalActive(false)
    }

    const handleApproveRequest = (adId) => {
        approveAd(adId)
        setModalActive(false)
    }

    const handleDeclineRequest = (adId) => {
        declineAd(adId)
        setModalActive(false)
    }

    return <div className="itemBox" onClick={() => setModalActive(true)}>
        <div style={{display: "flex", flexWrap: "wrap", height: "42px"}}>
            {tags &&
                tags.length > 0 &&
                tags.slice(0, 2).map((tag, index) => <div
                    key={index}
                    className="TypeItem"
                    style={{background: colors[index % colors.length]}}
                >
                    {tag.name}
                </div>)}
        </div>
        <div className="WalletOrder">{price} <img className="CoinImg" alt="penny" src={Coin}></img></div>
        <div className="Title">{title}</div>
        <div className="Description">{description}</div>
        <div className="Author">
            <span>@{user.login} {user.rating}</span>
            <img className="star" src={Image} alt="Image"/>
        </div>
        <Modal active={modalActive} setActive={setModalActive}>
            <div style={{display: "flex", flexWrap: "wrap", height: "42px"}}>
                {tags &&
                    tags.length > 0 &&
                    tags.slice(0, 4).map((tag, index) => <div
                        key={index}
                        className="TypeItem"
                        style={{background: colors[index % colors.length]}}
                    >
                        {tag.name}
                    </div>)}
            </div>
            <div style={{display: "flex"}}>
                <div className="TitleModal" style={{width: "400px"}}>
                    {title}
                </div>
                <div className="WalletOrder">{price} <img className="CoinImg" alt="penny" src={Coin}></img></div>
            </div>

            <div className="Author">
                <span>@ {user.login}{user.rating}</span>

                <img className="star" src={Image} alt="Image"/>

            </div>
            <div className="DescriptionModal" style={{marginTop: "10px", display: "flex"}}>
                {description}
            </div>
            {(isModerated && userId !== user.id.toString()) && <button className="ButtonModal" onClick={() => handleRequest(id)}>
                Откликнуться
            </button>}
            {userRole !== 'USER' && !isModerated &&
                <button className="ButtonModal GreenButton" onClick={() => handleApproveRequest(id)}
                        style={{marginRight: '20px'}}>
                    Одобрить
                </button>
            }
            {userRole !== 'USER' && !isModerated &&
                <button className="ButtonModal RedButton" onClick={() => handleDeclineRequest(id)}>
                    Отклонить
                </button>}
        </Modal>
    </div>;
};

export default Item;