import React, {useContext, useEffect, useState} from "react";
import NavigationBar from "../components/NavigationBar";
import ItemList from "../components/ItemList";
import Image from "../images/Vector.png"
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {
    createOrder,
    fetchBrands,
    fetchAllOrders,
    fetchTypes,
    fetchOrdersToCheck,
    fetchMyOrders
} from "../http/OrderApi";

const Main = observer(() => {
    const { order } = useContext(Context);
    const {userRole} = useContext(Context)
    const [searchTitle, setSearchTitle] = useState('');
    const [searchType, setSearchType] = useState('');
    const [pageType, setPageType] = useState('all')

    const handleSearch = () => {
        const filters = {
            title: searchTitle
        };
        if (searchType !== '') {
            filters.type = searchType;
        }

        let fetchFunction;

        switch (pageType) {
            case 'to_check':
                fetchFunction = fetchOrdersToCheck;
                break;
            case 'mine':
                fetchFunction = fetchMyOrders;
                break;
            case 'all':
            default:
                fetchFunction = fetchAllOrders;
                break;
        }

        fetchFunction(filters).then((data) => {
            order.setDevices(data);
        });
    };

    useEffect(() => {
        // Assuming you want to load orders on the initial render
        handleSearch();
    }, []); // Empty dependency array means it runs only once on mount

    const handleSearchButtonClick = (event) => {
        event.preventDefault()
        handleSearch();
    };

    return (
        <div>
            <NavigationBar />
            <div style={{display: 'flex', padding: '0px 50px'}}>
                <form className="SearchTitle">
                    <input
                        className="SearchTitleTxt"
                        placeholder="Искать..."
                        type="text"
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                    />
                    <button className="SearchTitleBtn" onClick={handleSearchButtonClick}>
                        <img alt="img" className="SearchTitleImg" src={Image}/>
                    </button>
                </form>
                <form>
                    <select
                        className="SelectField"
                        size="1"
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                    >
                        <option value=''>Любой</option>
                        <option value="ORDER">Ищу заказ</option>
                        <option value="SERVICE">Ищу услугу</option>
                    </select>
                </form>
                <form>
                    <select
                        className="SelectField"
                        size="1"
                        value={pageType}
                        onChange={(e) => setPageType(e.target.value)}
                    >
                        <option value="all">Все объявления</option>
                        <option value="mine">Мои объявления</option>
                        {userRole !== 'USER' && <option value="to_check">Непроверенные</option>}
                    </select>
                </form>
            </div>
            <div style={{padding: '0px 50px'}}>
                <ItemList/>
            </div>
        </div>
    );
});

export default Main;