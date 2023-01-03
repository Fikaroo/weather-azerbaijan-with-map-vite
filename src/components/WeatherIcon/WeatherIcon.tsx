import { useEffect } from "react";
import {
  WiDayRain,
  WiNightAltRain,
  WiDayLightning,
  WiNightAltLightning,
  WiDayStormShowers,
  WiNightAltStormShowers,
  WiDayShowers,
  WiNightAltShowers,
  WiDaySnow,
  WiNightAltSnow,
  WiDust,
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
} from "react-icons/wi";
import { useAppDispatch } from "../../state/hooks";
import { setColor } from "../../state/actions/action";

interface IWeatherIcon {
  width: string;

  weather: { id: number; main: string; description: string; icon: string };
}

const WeatherIcon = ({ width, weather }: IWeatherIcon) => {
  const Icons = [
    {
      id: [
        200, 201, 202, 210, 211, 212, 221, 500, 501, 502, 503, 504, 511, 520,
        521, 522, 531,
      ],
      icon: {
        day: <WiDayLightning className={width} />,
        night: <WiNightAltLightning className={width} />,
      },
      colors: ["#facc15"],
    },
    {
      id: [230, 231, 232],
      icon: {
        day: <WiDayStormShowers className={width} />,
        night: <WiNightAltStormShowers className={width} />,
      },
      colors: ["#f472b6"],
    },
    {
      id: [300, 301, 302, 310, 311, 312],
      icon: {
        day: <WiDayRain className={width} />,
        night: <WiNightAltRain className={width} />,
      },
      colors: ["#818cf8"],
    },
    {
      id: [313, 314, 321],
      icon: {
        day: <WiDayShowers className={width} />,
        night: <WiNightAltShowers className={width} />,
      },
      colors: ["#f87171"],
    },
    {
      id: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
      icon: {
        day: <WiDaySnow className={width} />,
        night: <WiNightAltSnow className={width} />,
      },
      colors: ["#111827"],
    },
    {
      id: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
      icon: {
        day: <WiDust className={width} />,
        night: <WiDust className={width} />,
      },
      colors: ["#fb923c"],
    },
    {
      id: [800],
      icon: {
        day: <WiDaySunny className={width} />,
        night: <WiNightClear className={width} />,
      },
      colors: ["#38bdf8"],
    },
    {
      id: [801, 802, 803, 804],
      icon: {
        day: <WiDayCloudy className={width} />,
        night: <WiNightAltCloudy className={width} />,
      },
      colors: ["#60a5fa"],
    },
  ];

  const data = Icons.find((icon) => icon.id.includes(weather.id));
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setColor(data?.colors));
  }, [weather]);

  return weather.icon === "01d" ? (
    <div style={{ color: data?.colors[0] }}>{data?.icon.day}</div>
  ) : (
    <div style={{ color: data?.colors[0] }}>{data?.icon.night}</div>
  );
};

export default WeatherIcon;
