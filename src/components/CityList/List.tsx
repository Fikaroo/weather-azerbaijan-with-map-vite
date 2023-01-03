import React from "react";
import { Link } from "react-router-dom";

type ListType = {
  id: number;
  name: string;
};

const List = ({ name, id }: ListType) => {
  return (
    <div className="flex w-full max-w-xs text-xl hover:scale-105 transition-all ">
      <Link to={`/weather/${name}`} className="w-full">
        <div className="flex bg-indigo-200 w-full rounded-lg py-4 px-4 gap-4 items-center">
          <p className="rounded-md bg-indigo-600 text-white w-10 h-10 flex justify-center items-center">
            {id + 1}
          </p>
          <p className="text-center w-2/3">{name}</p>
        </div>
      </Link>
    </div>
  );
};

export default List;
