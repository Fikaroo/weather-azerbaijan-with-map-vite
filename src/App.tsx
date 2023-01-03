import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Weather from "./pages/Weather";

const App = () => {
  return (
    <div className="w-full min-h-screen font-medium text-gray-900 container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather/:city" element={<Weather />} />
      </Routes>
    </div>
  );
};

export default App;
