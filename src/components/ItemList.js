import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Item from "./Item";

const ItemList =observer(()=>{
    const {Order} = useContext(Context)

    return(
        <div className="ItemList">
            {device.devices.map(device =>
                <Item key={device.id} order={order}/>
            )}
        </div>
        
    )
})

export default ItemList;