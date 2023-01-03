import { useState } from "react";
import data from "../data/cities.json";
import List from "./List";
import { BsSearch } from "react-icons/bs";
const CityList = () => {
  const [val, setVal] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setVal(e.target.value);
  return (
    <div className="">
      <div className="w-full flex justify-center py-4">
        <div className="max-w-sm border flex px-2 rounded-lg gap-4">
          <input
            value={val}
            onChange={handleSearch}
            type="text"
            className=" w-full py-1 focus:outline-none"
          />
          <BsSearch className="w-5" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 py-4 justify-items-center transition-all">
        {data
          .filter(({ name }) =>
            name.toLowerCase().startsWith(val.toLowerCase())
          )
          .map(({ id, name }, idx) => (
            <List key={id} name={name} id={idx} />
          ))}
      </div>
    </div>
  );
};

export default CityList;
