import React, {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import ProfileIcon from "../images/profile.png"
import AddOrder from "../images/AddOrders.png"
import Modal from "./Modal";
import BtnSend from "../images/BtnSend.png"
import {createOrder} from "../http/OrderApi";
import Coin from "../images/coin.png"
import Exit from "../images/Exit.png"
import {useHistory} from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";

const NavigationBar = () => {
    const {user} = useContext(Context);
    const [modalActive, setModalActive] = useState(false);
    const [orderTitle, setOrderTitle] = useState('');
    const [orderDescription, setOrderDescription] = useState('');
    const [price, setPrice] = useState(0)
    const history = useHistory()

    const handleAddOrder = () => {

        const orderBody = {
            description: orderDescription,
            title: orderTitle,
            price: price,
            tags: [1],
            type: 'ORDER'
        }

        createOrder(orderBody)
    };

    const handleExit = () => {
        user.setIsAuth(false)
        localStorage.clear()
        history.push(LOGIN_ROUTE)
    }

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };
    return (
        <div className="Navbar">
            <div style={{padding: "50px"}}>
                <span className="firstPartOfName" style={{fontSize: "35px"}}>4S</span><span className="secondPartOfName"
                                                                                            style={{fontSize: "35px"}}>tudents</span>
            </div>
            {user.isAuth ?
                <div style={{padding: "20px"}}>
                    <button className="ButtonNavbar"> Вход</button>
                    <button className="ButtonNavbar"> Регистрация</button>
                </div>
                :
                <div className="NavbarAuth">
                    <button className="AddOrderBtn" onClick={() => setModalActive(true)}><img className="AddOrderIcon"
                                                                                              alt="img" src={AddOrder}/>
                    </button>
                    <Modal active={modalActive} setActive={setModalActive}>
                        <div className="secondPartOfName"
                             style={{fontSize: "50px", color: "#364958bf", padding: "10px"}}>
                            Добавить заказ
                            <div>
                                <input className="InputModalCoin" value={price} onChange={handlePriceChange}></input>
                                <img alt="icon" src={Coin} style={{flex: "0 0 auto"}}></img>
                            </div>
                        </div>
                        <div>
                            <input
                                className="InputOrderTitle"
                                placeholder="Название объявления..."
                                type="text"
                                value={orderTitle}  // Use orderTitle state here
                                onChange={(e) => setOrderTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <textarea
                                className="InputOrderDescription"
                                placeholder="Опишите ваше объявление"
                                value={orderDescription}  // Use orderDescription state here
                                onChange={(e) => setOrderDescription(e.target.value)}
                            />
                        </div>
                        <div style={{display: "flex", justifyContent: "flex-end"}}>
                            <button className="ButtonSendOrder" onClick={() => {
                                handleAddOrder();
                                setModalActive(false)
                            }}>
                                <img className="SendOrderIcon" alt="img" src={BtnSend}></img>
                            </button>
                        </div>
                    </Modal>
                    <button className="ProfileBtn"><img className="ProfileIcon" alt="img" src={ProfileIcon}/></button>
                    <button className="ProfileBtn" onClick={handleExit}><img className="ProfileIcon" alt="img" src={Exit} style={{ marginLeft: '10px' }}/></button>

                </div>
            }


        </div>

    );
}

export default NavigationBar;