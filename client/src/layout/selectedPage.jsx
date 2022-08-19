import React from "react";
import UserProvider from "../hooks/useUsers";
import { useFavorite } from "../hooks/useFavorite";
import UseFetch from "../hooks/useFetch";
import { API_URL, API_KEY } from "../utils/openWeatherInfo";
import ItemCardFavorite from "../page/itemCardFavorite";

const SelectedPage = () => {
    const { getFavorites } = useFavorite();
    const { setUrl } = UseFetch();
    const favorite = getFavorites();
    console.log(favorite);
    // useEffect(() => {
    //     favorite.map((item) => {
    //         return (setUrl(`${API_URL}weather?q=${item}&appid=${API_KEY}&units=metric`));
    // });
    // }, []);
    return (
        <>
            <UserProvider>
                {/* <button
                    type="button"
                    className="text-center btn btn-primary"
                    onClick={() => setUrl(`${API_URL}weather?q=${favorite[0]}&appid=${API_KEY}&units=metric`)}
                >
                Посмотреть избранное
                </button> */}
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
