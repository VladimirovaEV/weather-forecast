import React, { useState } from "react";
import PropTypes from "prop-types";

const SearchForm = ({ handleSearch }) => {
    const [city, setCity] = useState("");
    const handleChangeSearch = ({ target }) => {
        setCity(target.value);
    };
    return (
        <div className="container-md pb-5">
            <form className="d-flex">
                <label className="form-label">Введите город</label>
                <input
                    className="form-control me-2 border-primary"
                    type="search"
                    placeholder="Поиск"
                    aria-label="Search"
                    onChange={handleChangeSearch}
                    name="search"
                    value={city}
                />
                <button className="btn btn-outline-primary"
                    type="button"
                    onClick={() => handleSearch(city)}
                >
                    <i className="bi bi-search"></i>
                </button>
            </form>
        </div>
    );
};
SearchForm.propTypes = {
    handleSearch: PropTypes.func
};
export default SearchForm;
