import React from "react";
import SearchForm from "../components/searchForm";
import ItemCardPage from "../page/itemCardPage";
import UseFetch from "../hooks/useFetch";
import { API_URL, API_KEY } from "../utils/openWeatherInfo";

const MainComponent = () => {
    const { data, error, isloading, setUrl } = UseFetch();
    console.log(data);
    // let id = "id" + Math.random().toString(16).slice(2);
    return (
        <>
            <h1>Прогноз погоды</h1>
            <SearchForm
                handleSearch={(city) => setUrl(`${API_URL}weather?q=${city}&appid=${API_KEY}&units=metric`)}
            />

            {data && (<ItemCardPage
                dt={data.dt}
                tempMin={data.main.temp_min}
                tempMax={data.main.temp_max}
                main={data.name}
                country={data.sys.country}
                icon={data.weather[0].icon}
                wind={data.wind.speed}
            />
            )}
        </>
    );
};

export default MainComponent;
