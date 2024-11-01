import React, { useEffect, useState } from "react";
import AttendanceList from "../../components/AttendanceList";
import PageHeader from "../../components/page_header";
import axios from "axios";
// import BarChart from "../../components/BarChart";
import ReportGenerator from "../../components/ReportGenerator";
import ShiftSchedules from "../../components/ShiftSchedules";
import AbsenteeismTardiness from "../../components/AbsenteeismTardiness";

const AttendanceListPage = () => {
  const [dataEntries, setDataEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/entries");
        const data = response.data;
        setDataEntries(data);
      } catch (error) {
        console.error("Error submitting entry:", error);
      }
    };
    fetchEntries();
  }, []);

  const handleAddEntry = (newEntry) => {
    setEntries([...entries, newEntry]);
  };

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <PageHeader
          activePage={"AttendanceList"}
          modalName={"List"}
          // toggleModal={"#add_time"}
        />
       
        <AttendanceList entries={dataEntries} />
        <ReportGenerator />
        <ShiftSchedules />
        <AbsenteeismTardiness />
      </div>
    </div>
  );
};

export default AttendanceListPage;
