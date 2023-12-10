import React, {useContext, useEffect, useState} from "react";
import NavigationBar from "../components/NavigationBar";
import ItemList from "../components/ItemList";
import Image from "../images/Vector.png"
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {createOrder, fetchBrands, fetchOrders, fetchTypes} from "../http/OrderApi";

const Main = observer(() => {
    const { order } = useContext(Context);
    const [searchTitle, setSearchTitle] = useState(``);
    const [searchType, setSearchType] = useState('SERVICE'); // Default search type

    const handleSearch = () => {
        const filters = {
            title: searchTitle,
            type: searchType,
        };

        fetchOrders(filters).then((data) => {
            order.setDevices(data);
        });
    };

    useEffect(() => {
        // Assuming you want to load orders on the initial render
        handleSearch();
    }, []); // Empty dependency array means it runs only once on mount

    return (
        <div>
            <NavigationBar />
            <div style={{ display: 'flex', padding: '0px 50px' }}>
                <form className="SearchTitle">
                    <input
                        className="SearchTitleTxt"
                        placeholder="Искать..."
                        type="text"
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                    />
                    <button className="SearchTitleBtn" onClick={handleSearch}>
                        <img alt="img" className="SearchTitleImg" src={Image} />
                    </button>
                </form>
                <form>
                    <select
                        className="SelectField"
                        size="1"
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                    >
                        <option value="order">Ищу заказ</option>
                        <option value="Service">Ищу услугу</option>
                    </select>
                </form>
            </div>
            <div style={{ padding: '0px 50px' }}>
                <ItemList />
            </div>
        </div>
    );
});

export default Main;