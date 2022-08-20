import React, { useState, useEffect } from "react";
import UserProvider from "../hooks/useUsers";
import { useFavorite } from "../hooks/useFavorite";
import UseFetch from "../hooks/useFetch";
import { API_URL, API_KEY } from "../utils/openWeatherInfo";
import ItemCardFavorite from "../page/itemCardFavorite";

const SelectedPage = () => {
    const { getFavorites } = useFavorite();
    const { setUrl } = UseFetch();
    const [favorite, setFavorites] = useState([]);
    useEffect(() => {
        const fetchFavorite = async () => {
            const result = await getFavorites();
            setFavorites(result.data);
        };
        fetchFavorite();
    }, []);
    return (
        <>
            <UserProvider>
                {
                    (favorite.map((item) => {
                        const data = setUrl(`${API_URL}weather?q=${item}&appid=${API_KEY}&units=metric`);
                        return (
                            <ItemCardFavorite key={data.id}
                                dt={data.dt}
                                tempMin={data.main.temp_min}
                                tempMax={data.main.temp_max}
                                name={data.name}
                                country={data.sys.country}
                                icon={data.weather[0].icon}
                                wind={data.wind.speed}
                                data={data}
                                id={data.id}
                            />
                        );
                    }))
                }
            </UserProvider>
        </>
    );
};

export default SelectedPage;
