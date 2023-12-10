import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Item from "./Item";

const ItemList = observer(() => {
    const { order } = useContext(Context);

    return (
        <div className="ItemList">
            {order.devices.map(orderItem => (
                <Item key={orderItem.id} order={orderItem} />
            ))}
        </div>
    );
});

export default ItemList;