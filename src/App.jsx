import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Navigate,
  Routes,
  redirect,
  useNavigate,
  useLocation,
  HashRouter,
} from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Dashboard from "./pages/dashboard";
import EmployeeList from "./pages/employees/employees_list_page";
import AddEmployee from "./pages/employees/add_employee";
import EmployeeDetail from "./pages/employees/components/employee_detail";
import DepartmentsPage from "./pages/departments/departments_page";
import PositionsPage from "./pages/positions/positions_page";
import LoginPage from "./pages/auth/login";
import JobApplicationPage from "./pages/application/job_application_page";
import HomePage from "./Home";
import AddThroughUpload from "./pages/employees/upload_excel";
import { useSelector } from "react-redux";

const App = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    // <BrowserRouter>
    //   <>

    //   </>
    // </BrowserRouter>

    <HashRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            isAuth ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
        <Route exact path="/" element={<HomePage />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/employees" element={<EmployeeList />} />
          <Route exact path="/add/employee" element={<AddEmployee />} />
          <Route
            exact
            path="/add/employee/excel"
            element={<AddThroughUpload />}
          />
          <Route
            exact
            path="/employee/:employeeId"
            element={<EmployeeDetail />}
          />
          <Route exact path="/departments" element={<DepartmentsPage />} />
          <Route exact path="/positions" element={<PositionsPage />} />
        </Route>

        <Route exact path="/login" element={<LoginPage />} />

        <Route exact path="/job/application" element={<JobApplicationPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
