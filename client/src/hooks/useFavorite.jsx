import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

const FavoriteContext = React.createContext();

export const useFavorite = () => {
    return useContext(FavoriteContext);
};

export const FavoriteProvider = ({ children }) => {
    const [favorite, setFavorite] = useState([]);
    async function getFavorite(name) {
        return await setFavorite(favorite => [...favorite, name]);
    }
    return (
        <FavoriteContext.Provider value = {{ favorite, getFavorite }}>
            { children }
        </FavoriteContext.Provider>
    );
};

FavoriteProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default FavoriteProvider;
