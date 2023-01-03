import { useRef, useState } from "react";
import "./index.css";
import { useDimensions } from "webrix/hooks";
import { TbTemperatureCelsius } from "react-icons/tb";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import { useAppSelector } from "../../state/hooks";
// const DATA = [[1131, 1604, 1240, 1731, 1304, 2101, 1701, 100]];

const COLORS = ["#00baf0", "#5637f4"];
const LABELS = [
  "03.00",
  "06.00",
  "09.00",
  "12.00",
  "15.00",
  "18.00",
  "21.00",
  "00.00",
];

const Line = ({ path, color }: any) => {
  const dx = 100 / (path.length - 1);
  const d = `M0,${path[0]} ${path
    .slice(1)
    .map(
      (p: any, i: number) =>
        `C${dx * i + dx / 2},${path[i]} ` +
        `${dx * (i + 1) - dx / 2},${path[i + 1]} ` +
        `${dx * (i + 1)},${path[i + 1]} `
    )
    .join(" ")}`;
  return (
    <>
      <path stroke={color} d={d} fill="none" className="stroke" />
      <path
        d={d + ` V0 H0 Z`}
        fill={`url(#gradient-${color})`}
        className="gradient"
      />
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0} />
          <stop offset="100%" stopColor={color} stopOpacity={0.15} />
        </linearGradient>
      </defs>
    </>
  );
};

const Points = ({ data, width, height, setActive, range, point }: any) => {
  const timeout = useRef() as any;
  const dr = Math.abs(range[1] - range[0]);
  const activate = (path: any, point: number) => {
    clearTimeout(timeout.current);
    setActive({ path, point });
  };

  return (
    <div className="points">
      {data.map((row: any[], r: any) =>
        row.map((y, i) => (
          <div
            key={i}
            className="cursor-pointer"
            style={{
              left: `${(i * width) / (row.length - 1)}px`,
              top: `${height - y * (height / dr)}px`,
            }}
            onClick={() => activate(r, i)}
            // onMouseLeave={() => deactivate(r, i)}
          >
            <div
              className={`${
                point === i ? "opacity-100" : "opacity-40"
              } flex w-full pl-8`}
            >
              <p className="flex font-medium items-center">
                {(Number(y) - 15).toFixed()}
                <TbTemperatureCelsius className="w-5" />
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const Legend = ({
  labes,
  time,
  weather,
}: {
  labes: string;
  time: string;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}) => {
  const translate = {
    Clear: "Təmiz",
    Clouds: "Bulud",
    Snow: "Qar",
    Rain: "Yağış",
    Drizzle: "Çiskin",
    Thunderstorm: "Tufan",
  };

  const w = Object.entries(translate).map((obj) => {
    return obj[0] === weather.main && obj[1];
  });
  return (
    <div className="absolute right-0 top-10">
      <div className="grid gap-4">
        <h1 className="text-4xl">{labes}</h1>
        <p className="text-gray-400 text-right">{time.split(".").join(":")}</p>
        <p className="text-gray-400 text-right">{w}</p>
      </div>
    </div>
  );
};

const Marker = ({ colors, data, active, width, height, range }: any) => {
  const { path, point } = active || {};
  const value = data[path]?.[point];
  const dr = Math.abs(range[1] - range[0]);
  return (
    <div
      className="marker"
      style={{
        opacity: 1,
        color: colors[path],
        left: `${(point * width) / (data[path]?.length - 1)}px`,
        top: `${height - value * (height / dr)}px`,
      }}
    >
      <div className="circle" />
    </div>
  );
};

const Graph = ({ data, colors, weather, range, labels, legend, time }: any) => {
  const [active, setActive] = useState({ path: 0, point: 0 });
  const graph = useRef() as any;
  const { width, height } = useDimensions(graph);
  data = [data[0]?.map((temp: number) => (temp + 15).toFixed())];
  return (
    <div className="relative h-[500px] w-full" ref={graph}>
      <div className="flex absolute top-8 -left-4 gap-2">
        <div>
          <WeatherIcon weather={weather[active.point]} width={"w-32"} />
        </div>
        <div className="flex text-4xl font-semibold justify-center items-center">
          {data[0][active.point] - 15} <TbTemperatureCelsius className="w-10" />
        </div>
      </div>
      <Marker
        colors={colors}
        data={data}
        active={active}
        labels={labels}
        width={width}
        height={height}
        range={range}
      />
      <Legend
        weather={weather[active.point]}
        labes={legend}
        time={time[active.point]}
      />
      <svg
        id="line"
        viewBox={`0 ${range[0]} 100 ${range[1]}`}
        preserveAspectRatio="none"
      >
        {data.map((path: number[], i: any) => {
          return <Line key={i} path={path} color={colors[i]} />;
        })}
      </svg>
      <div className="flex absolute  w-full -bottom-8 -left-2 sm:-left-5 gap-[19px] sm:gap-[44px] md:gap-[62px] lg:gap-[99px] xl:gap-[135px]">
        {labels.map((label: any) => (
          <div key={label}>{label}</div>
        ))}
      </div>

      <Points
        data={data}
        width={width}
        height={height}
        setActive={setActive}
        range={range}
        point={active.point}
      />
    </div>
  );
};

interface DataTypes {
  temp: number[] | undefined;

  weather:
    | {
        id: number;
        main: string;
        description: string;
        icon: string;
      }[]
    | undefined;

  time: string[] | undefined;
  city: string | undefined;
}

const TemperatureChart = ({ temp, weather, time, city }: DataTypes) => {
  const max = Math.max(...(temp?.map((temp) => temp) || [0]));
  const { colors } = useAppSelector((state) => state.color);
  return (
    <Graph
      weather={weather}
      data={[temp] || [""]}
      colors={colors}
      range={[0, max * 6]}
      labels={time || [""]}
      legend={city}
      time={time || [""]}
    />
  );
};

export default TemperatureChart;
