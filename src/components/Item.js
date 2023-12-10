import React from "react";
import Image from "../images/image.png"

const Item = ({ order }) => {
    // Extracting relevant fields from the order object
    const { type, title, description, user, tags } = order;
    const colors = ['#2eb87e66', '#ff5733', '#5c33ff', '#ffaa00']; // Add more colors as needed


    return (
        <div className="itemBox">
            <div style={{ display: "flex", flexWrap: "wrap", height: "42px" }}>
                {tags &&
                    tags.length > 0 &&
                    tags.slice(0,2).map((tag, index) => (
                        <div
                            key={index}
                            className="TypeItem"
                            style={{ background: colors[index % colors.length] }}
                        >
                            {tag.name}
                        </div>
                    ))}
            </div>
            <div className="Title">{title}</div>
            <div className="Description">{description}</div>
            <div className="Author">
                {/* Assuming 'user' is an object with 'login' and 'rating' properties */}
                <span>@{user.login} {user.rating}</span>
                {/* You may add more details from the 'user' object as needed */}
                <img className="star" src={Image} alt="Image" />
            </div>
        </div>
    );
};

export default Item;