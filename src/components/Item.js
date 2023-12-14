import React, {useContext, useState} from "react";
import Image from "../images/image.png"
import Coin from "../images/coin.png"
import Modal from "./Modal";
import "../styles/Modal.css"
import {approveAd, declineAd, finishExecution, requestToAd} from "../http/OrderApi";
import {Context} from "../index";
import Close from "../images/BtnClose.png"
import Person from "./Person";

const Item = ({order, pageType}) => {

    const {id, type, title, description, user, tags, price, isModerated, candidates, executor, isFinished} = order;
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

    const handleFinishExecution = () => {
        finishExecution(id)
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
            <img
                src={Close}
                alt="Close"
                className="CloseButton"
                onClick={() => setModalActive(false)}
            />
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
            {(pageType === 'all' && isModerated && userId !== user.id.toString()) &&
                <button className="ButtonModal" onClick={() => handleRequest(id)}>
                    Откликнуться
                </button>}
            {pageType === 'to_check' && userRole !== 'USER' && !isModerated &&
                <button className="ButtonModal GreenButton" onClick={() => handleApproveRequest(id)}
                        style={{marginRight: '20px'}}>
                    Одобрить
                </button>
            }
            {pageType === 'to_check' && userRole !== 'USER' && !isModerated &&
                <button className="ButtonModal RedButton" onClick={() => handleDeclineRequest(id)}>
                    Отклонить
                </button>}
            {pageType === 'mine' && !executor && <div>
                <div className="ModalResp">Отклики:</div>
                {candidates.map(candidate => (
                    <Person key={candidate.id} user={candidate} order={order}/>
                ))}
            </div>}
            {pageType === 'mine' && executor && <div>
                <div className="ModalResp">Исполнитель:</div>
                <Person key={executor.id} user={executor} order={order} isExecutor={true}/>
                {!isFinished && <button className="ButtonModal GreenButton" onClick={() => handleFinishExecution()}
                                       style={{marginLeft: "50px", width: "150px"}}>Завершить
                </button>}
            </div>}
        </Modal>
    </div>;
};

export default Item;