import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Item from "./Item";

const ItemList = observer(({pageType}) => {
    const { order } = useContext(Context);

    return (
        <div className="ItemList">
            {order.devices.map(orderItem => (
                <Item key={orderItem.id} orderItem={orderItem} pageType={pageType} />
            ))}
        </div>
    );
});

export default ItemList;