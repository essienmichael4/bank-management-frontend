import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Layout from "./layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import Savings from "./pages/savings/Savings";
import Loan from "./pages/loans/Loan";
import Transactions from "./pages/transactions/Transactions";
import Users from "./pages/users/Users";
import SavingsAccount from "./pages/savingsaccount/SavingsAccount";
import LoansAccount from "./pages/loansaccount/LoansAccount";
import CreateSavingsAccount from "./pages/createsavingsaccount/CreateSavingsAccount";
import CreateLoansAccount from "./pages/createloansaccount/CreateLoansAccount";
import RequireAuth from "./components/RequireAuth";
import SetAuth from "./components/SetAuth";
import Transaction from "./pages/transaction/Transaction";

function App() {
  return (
    <div className="App text-black">
      <Routes>
        {/* <Route element={<SetAuth />}> */}
          <Route path="/" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path="bms" element={<Layout/>} >
              <Route path="dashboard" element={<Dashboard/>} />
              <Route path="savings" element={<Savings />} />
              <Route path="savings/:id" element={<SavingsAccount />} />
              <Route path="savings/create" element={<CreateSavingsAccount />} />
              <Route path="loans" element={<Loan />} />
              <Route path="loans/:id" element={<LoansAccount />} />
              <Route path="loans/create" element={<CreateLoansAccount />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="transactions/:id" element={<Transaction />} />
              <Route path="users" element={<Users />} />
            </Route>
          </Route>
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
