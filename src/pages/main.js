import React , {useContext, useEffect} from "react";
import NavigationBar from "../components/NavigationBar";
import ItemList from "../components/ItemList";
import Image from "../images/Vector.png"
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchOrders, fetchTypes} from "../http/OrderApi";

const Main= observer(() =>{

    const { order } = useContext(Context);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orders = await fetchOrders();
                order.setDevices(orders);
            } catch (error) {
                console.error('Ошибка получения заказов:', error);
            }
        };

        fetchData()
    }, [order]);


    return(
        <div>
            <NavigationBar/>
            <div style={{display:"flex",padding:"0px 50px"}}>
                <form className="SearchTitle">
                <input 
                className="SearchTitleTxt" 
                placeholder="Искать..." 
                type="text"
                />
                <button className="SearchTitleBtn"><img alt="img" className="SearchTitleImg" src={Image}/></button>
                </form>
                <form >
                    <select className="SelectField"  size="1">
                        <option selected value="order">Ищу заказ</option>
                        <option value="Service">Ищу услугу</option>
                    </select>
                </form>
            </div>
            <div style={{padding:"0px 50px"}}>
               <ItemList/>
            </div>
            
        </div>
        
        
        
    );
});

export default Main;