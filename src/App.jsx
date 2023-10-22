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
import OrientsPage from "./pages/staffing_solution/orients_page";
import AddOrientPage from "./pages/staffing_solution/add_orient_page";
import OrienteeDetail from "./pages/staffing_solution/orientee_detail_page";
import CompaniesPage from "./pages/companies/companies_page";
import { ToastContainer, toast } from "react-toastify";
import SchedulerPage from "./pages/rumuko_management/schedule_page";
import LeaveType from "./pages/leave-management/leave_type_page";
import AppliedLeaves from "./pages/leave-management/applied_leaves_page";
import EmployeeRoles from "./pages/employee_roles/employee_roles_page";

const App = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <HashRouter>
      <ToastContainer />
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
          <Route exact path="/roles" element={<EmployeeRoles />} />
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

          <Route exact path="/orients" element={<OrientsPage />} />
          <Route exact path="/add/orient" element={<AddOrientPage />} />
          <Route
            exact
            path="/orientee/:orienteeId"
            element={<OrienteeDetail />}
          />

          <Route exact path="/companies" element={<CompaniesPage />} />

          <Route exact path="/departments" element={<DepartmentsPage />} />
          <Route exact path="/positions" element={<PositionsPage />} />
          <Route exact path="/schedule" element={<SchedulerPage />} />

          <Route exact path="/leave/settings" element={<LeaveType />} />
          <Route exact path="/leaves" element={<AppliedLeaves />} />
        </Route>

        <Route exact path="/login" element={<LoginPage />} />

        <Route exact path="/job/application" element={<JobApplicationPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
