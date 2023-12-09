import React from "react";
import Image from "../images/image.png"

const Item =({order})=>{ // поля order вставить в нужнеы места и отрисуется все
    

    return(
        <div className="itemBox">
            
            <div style={{display:"flex",flexwrap: "wrap",height:"42px"}}>
                <div className="TypeItem" >course</div>
                <div className="TypeItem"style={{background:"#2eb87e66"}}>subject</div>
            </div>
            <div className="Title" >
                Скиньте лабу по ТОЭ тема МКТ киньте лабу по ТОЭ тема МКТ
            </div>
            <div className="Description">
                Согласно новым исследованиям, проведенным ведущими учеными, люди на самом деле видят не глазами, а волосами. Эта удивитель  Согласно новым исследованиям, проведенным ведущими учеными, люди на самом деле видят не глазами, а волосами. Эта удивитель 
            </div>
            <div className="Author">
                <span>@AntonioSanDiego 5</span> 
                
                <img className="star" src={Image} alt="Image"  /> 
            </div>
        </div>
    )

}

export default Item;