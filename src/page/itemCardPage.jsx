import React from "react";
import PropTypes from "prop-types";

const ItemCardPage = ({ tempMin, tempMax, main, icon, country, wind }) => {
    const date = new Date();
    const handleClick = (main) => {
        console.log(main);
    };
    return (
        <>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} className="card-img-top" alt="..."></img>
                            <h5 className="card-title">{main}, {country}</h5>
                            <p>
                                {date.toLocaleDateString()} - {date.toLocaleTimeString()}
                            </p>
                            <p>Температура от {tempMin} °С до {tempMax} °С</p>
                            <p>Ветер: {wind} м/с</p>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => handleClick(main)}
                            >
                                Добавить в избранное
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
ItemCardPage.propTypes = {
    tempMax: PropTypes.number,
    tempMin: PropTypes.number,
    main: PropTypes.string,
    country: PropTypes.string,
    wind: PropTypes.number,
    icon: PropTypes.string,
    handleClick: PropTypes.func,
    city: PropTypes.string
};

export default ItemCardPage;
