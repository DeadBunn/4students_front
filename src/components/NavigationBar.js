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
import {toast} from "react-toastify";

const NavigationBar = () => {
    const {user} = useContext(Context);
    const {order} = useContext(Context)
    const [modalActive, setModalActive] = useState(false);
    const [orderTitle, setOrderTitle] = useState('');
    const [orderDescription, setOrderDescription] = useState('');
    const [price, setPrice] = useState(0)
    const history = useHistory()
    const [profileActive,setProfileActive] = useState(false)

    const handleAddOrder = async () => {
            try {
                const orderBody = {
                    description: orderDescription,
                    title: orderTitle,
                    price: price,
                    tags: [1],
                    type: 'ORDER'
                }

                const result = await createOrder(orderBody);
                toast.success('Вы успешно создали объявление!', { position: toast.POSITION.TOP_LEFT });
                const updatedDevices = order.devices.add(result)
                order.setDevices(updatedDevices)
            }
            catch (error) {
                if (error.response) {
                    const errorMessage = error.response?.data || 'Ошибка при создании объявления';
                    await toast.error(errorMessage, { position: toast.POSITION.TOP_LEFT });
                } else {
                    // Handle non-response errors here, if needed
                    console.error('Non-response error:', error);
                }}
    };

    const handleExit = async () => {
        user.setIsAuth(false)
        setProfileActive(false)
        localStorage.clear()
        history.push(LOGIN_ROUTE)
    }

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    useEffect(() => {
    }, [user.isAuth])
    return (
        <div className="Navbar">
            <div style={{padding: "50px"}}>
                <span className="firstPartOfName" style={{fontSize: "35px"}}>4S</span><span className="secondPartOfName"
                                                                                            style={{fontSize: "35px"}}>tudents</span>
            </div>
            {!user.isAuth ?
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
                    <button className="ProfileBtn" onClick={()=>setProfileActive(true)}><img className="ProfileIcon" alt="img" src={ProfileIcon}/></button>
                    <div className={profileActive ? "modalProfile active" : "modalProfile"} onClick={()=>setProfileActive(false)}>
                        <div className={profileActive ? "modalContentProfile active" : "modalContentProfile"} onClick={e=>e.stopPropagation()}>
                            <div>
                                <div style={{display:"flex",justifyContent:"space-between"}}>
                                    <div className="nameProfileModal">@{user.login}</div>
                                    <button style={{}} className="ProfileBtnModal" onClick={()=>setProfileActive(false)}><img className="ProfileIconModal" alt="img" src={ProfileIcon}/></button>
                                </div>
                                <div className="emailProfileModal">
                                    Почта:
                                </div>
                                <div className="emailModal">
                                    {user.email}
                                </div>
                                <div className="emailProfileModal" style={{paddingTop:"10px",display:"flex"}}>
                                    Баланс:
                                    <div className="balanceProfileModal">
                                        {user.balance} <img alt="icon" src={Coin} style={{height:"23px",}}></img>
                                    </div>
                                </div>
                                <div style={{paddingLeft:"10px",paddingTop:"10px",display:"flex",padding:"10px"}}>

                                    <button className="balanceBtnModal" >Пополнить</button>
                                    <input className="balanceInputModal" ></input>
                                </div>
                                <div style={{paddingLeft:"10px",paddingTop:"10px",display:"flex",padding:"10px"}}>

                                    <button className="balanceBtnModal" >Вывести</button>
                                    <input className="balanceInputModal" ></input>
                                </div>
                                <div style={{padding:"0 10px", width:"auto"}}>
                                    <button className="logoutBtnProfileModal" onClick={handleExit} >Выйти</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            }


        </div>

    );
}

export default NavigationBar;