import { useEffect, useState } from "react";
import axios from 'axios';
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
import ApplyForLeave from "./pages/leave-management/apply_leave";
import DepartmentDetail from "./pages/departments/department_detail";
import CompanyDetailedPage from "./pages/companies/company_detailed_page";
import EmployeeLogin from "./pages/auth/employee_login";
import AddOrientsThroughExcel from "./pages/staffing_solution/forms/orients_through_excel";
import Clients from "./pages/Clients/Clients";
// import Leads_page from "./pages/Leads/Leads_page";
import Tickets_pages from "./pages/Tickets/Tickets_pages";
// import TimeEntry from "./components/TimeEntry";
import TimeEntryPage from "./pages/time_entry/TimeEntryPage";
import AttendanceListPage from "./pages/AttendanceList/AttendanceListPage";
// import ReportGenerator from "./components/ReportGenerator";
// import BarChart from "./components/BarChart";
import ShiftSchedules from "./components/ShiftSchedules";
import AbsenteeismTardiness from "./components/AbsenteeismTardiness";


const App = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    document.body.style.zoom = "0.80";
  }, []);

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/entries');
        setEntries(response.data);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };
    fetchEntries();
  }, []);

  const handleAddEntry = (newEntry) => {
    setEntries([...entries, newEntry]);
  };


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
          <Route exact path="/clients" element={<Clients />} />
      
          <Route exact path="/tickets" element={<Tickets_pages />} />
          <Route exact path="/time" element={<TimeEntryPage />} />
          <Route exact path="/attendance/list" element={<AttendanceListPage />} />
          <Route exact path="/absence" element={<AbsenteeismTardiness />} />
          <Route exact path="/absent" element={<AbsenteeismTardiness />} />
          <Route exact path="/shift" element={<ShiftSchedules />} />

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
          <Route
            exact
            path="/add/orients/excel"
            element={<AddOrientsThroughExcel />}
          />

          <Route exact path="/companies" element={<CompaniesPage />} />

          <Route
            exact
            path="/company/:companyId"
            element={<CompanyDetailedPage />}
          />

          <Route exact path="/departments" element={<DepartmentsPage />} />
          <Route
            exact
            path="/department/:departmentId"
            element={<DepartmentDetail />}
          />
          <Route exact path="/positions" element={<PositionsPage />} />
          <Route exact path="/schedule" element={<SchedulerPage />} />

          <Route exact path="/leave/settings" element={<LeaveType />} />
          <Route exact path="/leaves" element={<AppliedLeaves />} />
          <Route exact path="/apply/leave" element={<ApplyForLeave />} />
        </Route>

        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/employee/login" element={<EmployeeLogin />} />

        <Route exact path="/job/application" element={<JobApplicationPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
