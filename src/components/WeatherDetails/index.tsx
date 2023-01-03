import TemperatureChart from "../TemperatureChart/TemperatureChart";
import { ForecastWeatherType } from "../../types";

const WeatherDetails = ({ weather, dt_txt }: ForecastWeatherType) => {
  console.log(weather, dt_txt);

  return (
    <div>
      <p>{dt_txt.split(" ")[0]}</p>
    </div>
  );
};

export default WeatherDetails;
