import { useState } from "react";
import CityList from "./CityList";
import Map from "./Map";
const Tabs = () => {
  const [tabs, setTabs] = useState([
    {
      name: "City List",
      isActive: true,
    },
    {
      name: "Map",
      isActive: false,
    },
  ]);

  const handleBtn = (idx: number) => {
    idx === 0
      ? setTabs([
          {
            name: "City List",
            isActive: true,
          },
          {
            name: "Map",
            isActive: false,
          },
        ])
      : setTabs([
          {
            name: "City List",
            isActive: false,
          },
          {
            name: "Map",
            isActive: true,
          },
        ]);
  };
  return (
    <div className="transition-all">
      <div className="flex justify-center pt-4">
        <div className="p-2 rounded-lg flex gap-2 bg-gray-100 border">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => handleBtn(idx)}
              className={`${tab.isActive ? "btn-active" : "btn"} `}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
      {tabs[0].isActive ? <CityList /> : <Map />}
    </div>
  );
};

export default Tabs;
