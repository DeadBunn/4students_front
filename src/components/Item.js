import React, {useContext, useEffect, useState} from "react";
import Image from "../images/image.png"
import Coin from "../images/coin.png"
import Modal from "./Modal";
import "../styles/Modal.css"
import {approveAd, declineAd, finishExecution, requestToAd} from "../http/OrderApi";
import {Context} from "../index";
import Close from "../images/BtnClose.png"
import Person from "./Person";
import {toast} from "react-toastify";

const Item = ({orderItem, pageType}) => {

    const {id, type, title, description, user, tags, price, isModerated, candidates, executor, isFinished} = orderItem;
    const { order } = useContext(Context);
    const {userRole} = useContext(Context)


    const colors = ['#2eb87e66', '#ff5733', '#5c33ff', '#ffaa00'];
    const [modalActive, setModalActive] = useState(false)
    const [userId, setUserId] = useState(localStorage.getItem('userId'))

    const handleRequest = async (adId) => {
        try {
            await requestToAd(adId);
            toast.success('Вы успешно откликнулись на объявление!', {position: toast.POSITION.TOP_LEFT});
            const updatedOrders = order.devices.filter((item) => item.id !== adId);
            order.setDevices(updatedOrders)
        } catch (error) {
            const errorMessage = error.response?.data || 'Ошибка при отклике на объявление';
            toast.error(errorMessage, {position: toast.POSITION.TOP_LEFT});
        }
        setModalActive(false);
    };

    const handleApproveRequest = async (adId) => {
        try {
            await approveAd(adId);
            toast.success('Объявление успешно одобрено', {position: toast.POSITION.TOP_LEFT});
             const updatedOrders = order.devices.filter((item) => item.id !== adId);
             order.setDevices(updatedOrders)
        } catch (error) {
            const errorMessage = error.response?.data || 'Ошибка при одобрении объявления';
            toast.error(errorMessage, {position: toast.POSITION.TOP_LEFT});
        }
        setModalActive(false);
    };

    const handleDeclineRequest = async (adId) => {
        try {
            await declineAd(adId);
            toast.success('Объявление успешно отклонено', {position: toast.POSITION.TOP_LEFT});
             const updatedOrders = order.devices.filter((item) => item.id !== adId);
             order.setDevices(updatedOrders)
        } catch (error) {
            const errorMessage = error.response?.data || 'Ошибка при отклонении объявления';
            toast.error(errorMessage, {position: toast.POSITION.TOP_LEFT});
        }
        setModalActive(false);
    };

    const handleFinishExecution = async () => {
        try {
            await finishExecution(id);
            toast.success('Объявление успешно завершено', {position: toast.POSITION.TOP_LEFT});
            orderItem.isFinshed = true
        } catch (error) {
            const errorMessage = error.response?.data || 'Ошибка при завершении объявления';
            toast.error(errorMessage, {position: toast.POSITION.TOP_LEFT});
        }
        setModalActive(false);
    };

    useEffect(() => {
    }, [orderItem.isFinshed])

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
                </button>
            }
            {pageType === 'to_check' && !isModerated &&
                <button className="ButtonModal GreenButton" onClick={() => handleApproveRequest(id)}
                        style={{marginRight: '20px'}}>
                    Одобрить
                </button>
            }
            {pageType === 'to_check' && !isModerated &&
                <button className="ButtonModal RedButton" onClick={() => handleDeclineRequest(id)}>
                    Отклонить
                </button>}
            {pageType === 'mine' && !executor && <div>
                <div className="ModalResp">Отклики:</div>
                {candidates.map(candidate => (
                    <Person key={candidate.id} user={candidate} order={orderItem}/>
                ))}
            </div>}
            {pageType === 'mine' && executor && <div>
                <div className="ModalResp">Исполнитель:</div>
                <Person key={executor.id} user={executor} order={orderItem} isExecutor={true}/>
                {!isFinished && <button className="ButtonModal GreenButton" onClick={() => handleFinishExecution()}
                                        style={{marginLeft: "50px", width: "150px"}}>Завершить
                </button>}
                {isFinished && <div className="TitleModal" style={{width: "600px"}}>
                    Объявление закрыто
                </div>}
            </div>}
            {pageType === 'requested' && type === 'ORDER' && executor?.id === user.id &&
                <div className="TitleModal" style={{width: "600px"}}>
                    Поздравляем! Вы назначены исполнителем!
                </div>}
        </Modal>
    </div>;
};

export default Item;