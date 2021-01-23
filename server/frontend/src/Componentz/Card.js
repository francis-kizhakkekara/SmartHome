import React from "react";

const Card = ({ title, body, status }) => {
    let cardAttributes = "card h-100";

    if (status) cardAttributes += " text-white bg-success";
    else cardAttributes += " text-white bg-danger";

    return (
        <>
            <div className={cardAttributes}>
                <div className="card-body">
                    <h5 className="card-title">{title || "Card title"}</h5>
                    <p className="card-text">
                        {body ||
                            "This is a CARD EXAMPLE SODJSDIOF SDO SIODJF SOIFOS DFFG ADFGUF"}
                    </p>
                </div>
            </div>
        </>
    );
};

export default Card;
