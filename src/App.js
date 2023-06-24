import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Layout from "./layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import Savings from "./pages/savings/Savings";
import Loan from "./pages/loans/Loan";
import Transactions from "./pages/transactions/Transactions";
import Users from "./pages/users/Users";

// import { DatePicker } from 'antd';

function App() {
  return (
    <div className="App text-black">

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="bms" element={<Layout/>} >
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="savings" element={<Savings />} />
          <Route path="loans" element={<Loan />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
