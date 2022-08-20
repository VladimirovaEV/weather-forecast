import React, { useContext } from "react";
import PropTypes from "prop-types";
import config from "../utils/config.json";
import httpService from "../services/http.service";
import localStorageService from "../services/localStorage.service";

const FavoriteContext = React.createContext();

export const useFavorite = () => {
    return useContext(FavoriteContext);
};

export const FavoriteProvider = ({ children }) => {
    // const [favorite, setFavorite] = useState([]);
    // async function getFavorite(name) {
    //     return await setFavorite(favorite => [...favorite, name]);
    // }
    const addToFavorite = (id) => {
        httpService.post(`${config.apiEndpoint}/favorite`, {
            cityId: id
        });
    };
    const getFavorites = (id) => {
        return httpService.get(`${config.apiEndpoint}/favorite/?orderBy=userId&equalTo=${localStorageService.getUserId()}`);
    };
    return (
        <FavoriteContext.Provider value = {{ addToFavorite, getFavorites }}>
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
