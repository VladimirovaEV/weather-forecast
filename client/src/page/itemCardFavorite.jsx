import React from "react";
import PropTypes from "prop-types";

const ItemCardFavorite = ({ tempMin, tempMax, name, icon, country, wind }) => {
    const date = new Date();
    return (
        <>
            <div className="col-md-4 mb-10">
                <div className="card bg-light text-center border-primary">
                    <div className="card-body">
                        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} className="card-img-top img-thumbnail w-50 border-primary" alt="..."></img>
                        <h5 className="card-title">{name}, {country}</h5>
                        <p>
                            {date.toLocaleDateString()} - {date.toLocaleTimeString()}
                        </p>
                        <p>Температура от {tempMin} °С до {tempMax} °С</p>
                        <p>Ветер: {wind} м/с</p>
                        {/* <button
                            type="button"
                            className="btn btn-primary"
                        >
                                Удалить из избранного
                        </button> */}
                    </div>
                </div>
            </div>
        </>
    );
};
ItemCardFavorite.propTypes = {
    tempMax: PropTypes.number,
    tempMin: PropTypes.number,
    name: PropTypes.string,
    country: PropTypes.string,
    wind: PropTypes.number,
    icon: PropTypes.string,
    handleClick: PropTypes.func,
    city: PropTypes.string,
    id: PropTypes.number
};

export default ItemCardFavorite;
