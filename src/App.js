import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App text-black">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="bms" element={<Layout/>} >
          <Route path="" element={<Dashboard/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
