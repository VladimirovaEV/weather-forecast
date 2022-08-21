import React, { useState, useEffect } from "react";
// import UserProvider from "../hooks/useUsers";
import { useFavorite } from "../hooks/useFavorite";
import { API_URL, API_KEY } from "../utils/openWeatherInfo";
import ItemCardFavorite from "../page/itemCardFavorite";

const SelectedPage = () => {
    const { getFavorites } = useFavorite();
    const [favorite, setFavorites] = useState([]);
    const [city, setCity] = useState([]);
    useEffect(() => {
        const fetchFavorite = async () => {
            const result = await getFavorites();
            setFavorites(result.data.content);
        };
        fetchFavorite();
    }, []);
    useEffect(() => {
        const requests = favorite.map((item) => fetch(`${API_URL}weather?id=${item.cityId}&appid=${API_KEY}&units=metric`));
        Promise.all(requests)
            .then((responses) => {
                const dataResults = responses.map((response) => response.json());
                return Promise.all(dataResults);
            })
            .then((cities) => {
                cities.forEach((data) => {
                    setCity(city => [...city, data]);
                });
            });
    }, [favorite]);

    return (
        <>
            <div className="container">
                <div className="row">
                    {(
                        city.map((data) => {
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
                                />
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
    // return (
    //     <>
    //         {/* <UserProvider> */}
    //         {
    //             (cities.map((data) => {
    //                 {/* setUrl(`${API_URL}weather?id=${item.cityId}&appid=${API_KEY}&units=metric`);
    //                 console.log(data); */}
    //                 return (
    // <ItemCardFavorite key={data.id}
    //     dt={data.dt}
    //     tempMin={data.main.temp_min}
    //     tempMax={data.main.temp_max}
    //     name={data.name}
    //     country={data.sys.country}
    //     icon={data.weather[0].icon}
    //     wind={data.wind.speed}
    //     data={data}
    //     id={data.id}
    // />
    //                 );
    //             }))
    //         }
    //         {/* </UserProvider> */}
    //     </>
    // );
};

export default SelectedPage;
