import { useParams } from "react-router-dom";
import WeatherDetails from "../components/WeatherDetails";
import { useQuery } from "react-query";
import axios from "axios";
import { ForecastWeatherType, WeatherType } from "../types";
import TemperatureChart from "../components/TemperatureChart/TemperatureChart";
import { AiOutlineLoading } from "react-icons/ai";
import { useEffect } from "react";
const instance = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  params: {
    appid: "643d0e5bc9d0580b3b3c7b42fb8f5930",
    units: "metric",
  },
});

const getWeatherData = async (
  cityName: string
): Promise<ForecastWeatherType[]> => {
  const { data } = await instance.get("/forecast", {
    params: {
      q: cityName,
    },
  });
  return data.list;
};

const Weather = () => {
  const { city } = useParams();
  const { data, isLoading, isError, refetch, remove } = useQuery(
    "weather",
    () => {
      return city ? getWeatherData(city) : getWeatherData("");
    }
  );
  const temp = data?.map(({ main }) => main.temp).slice(0, 8);
  const weather = data?.map(({ weather }) => weather[0]);
  useEffect(() => {
    remove();

    refetch();
  }, [city]);
  const time = data
    ?.map(({ dt_txt }) => dt_txt.split(" ")[1].slice(0, 5).split(":").join("."))
    .slice(0, 8);

  if (isLoading)
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <AiOutlineLoading className="animate-spin w-16" />
      </div>
    );
  if (isError)
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        Error
      </div>
    );
  return (
    <div>
      <TemperatureChart time={time} temp={temp} weather={weather} city={city} />
      {/* {data?.filter((item, idx) => (
        <WeatherDetails key={idx} {...item} />
      ))} */}
    </div>
  );
};

export default Weather;
