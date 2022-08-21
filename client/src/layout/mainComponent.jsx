import React from "react";
import SearchForm from "../components/searchForm";
import ItemCardPage from "../page/itemCardPage";
import UseFetch from "../hooks/useFetch";
import { API_URL, API_KEY } from "../utils/openWeatherInfo";

const MainComponent = () => {
    const { data, setUrl } = UseFetch();
    return (
        <>
            <div className="container bg-light">
                <h1 className="text-center text-primary mb-10">Прогноз погоды</h1>
                <SearchForm
                    handleSearch={(city) => setUrl(`${API_URL}weather?q=${city}&appid=${API_KEY}&units=metric`)}
                />

                {data && (<ItemCardPage
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
                )}
            </div>
        </>
    );
};

export default MainComponent;
