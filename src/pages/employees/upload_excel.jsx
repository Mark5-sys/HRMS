import React, { Fragment, useState } from "react";
import * as XLSX from "xlsx";
import Loading from "../../components/loader/loading";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../config";

const uploadDataToBackend = async (data, positions, departments) => {
  const transformedData = data.slice(1).map((row) => {
    const departmentName = row[4] || "HEAD OFFICE"; // Add conditional check for undefined departmentName
    const department = departments.find(
      (dept) => dept.name && dept.name.toLowerCase() === departmentName.toLowerCase()
    );
    const departmentId = department ? department.id : null;
    const positionName = row[1] || "General Person"; // Add conditional check for undefined positionName
    const position = positions.find(
      (pos) => pos.name && pos.name.toLowerCase() === positionName.toLowerCase()
    );
    const positionId = position ? position.id : null;
    let gender = "";
    if (row[8] === "M") {
      gender = "Male";
    } else if (row[8] === "F") {
      gender = "Female";
    }

    return {
      code: row[0],
      position_id: positionId,
      first_name: row[2],
      surname: row[3],
      department_id: departmentId,
      national_id: row[5],
      marital_status: row[6],
      date_of_birth: new Date((row[7] - 25569) * 86400 * 1000)
        .toISOString()
        .slice(0, 10),
      gender: gender,
      postal_city: row[9],
      phone_number_1: row[10],
      phone_number_2: row[11],
      status: "Active",
    };
  });

  console.log("Uploaded Data", transformedData);

  for (const employee of transformedData) {
    try {
      await fetch(`${API}/employee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });
      console.log("Upload success:", employee);
    } catch (error) {
      console.log("Upload error:", error);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Add a delay of 1 second between requests
  }
};

const AddThroughUpload = () => {
  const [excelData, setExcelData] = useState(null);
  const [loading, setLoading] = useState(false);
  const positions = useSelector((state) => state.position.positions);
  const departments = useSelector((state) => state.department.departments);

  const dispatch = useDispatch();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setExcelData(data);
    };
    reader.readAsBinaryString(file);
  };

  const handleDataUpload = () => {
    if (excelData) {
      setLoading(true);
      uploadDataToBackend(excelData, positions, departments);
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Profile</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a >Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active">Excel Upload</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container_">
            <h4>Upload Excel Sheet</h4>
            <form>
              <div className="form-floating">
                <div className="row">
                  <div className="col-xl-6 col-12">
                    <label
                      htmlFor="fileInput"
                      className="form-label form-label"
                      style={{
                        textTransform: "uppercase",
                      }}
                    >
                      Upload Excel File
                    </label>
                    <div className="mb-3">
                      <input
                        className="form-control"
                        type="file"
                        id="fileInput"
                        onChange={handleFileUpload}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-12">
                    {loading ? (
                      <div
                        className="btn"
                        style={{
                          marginTop: "1.5rem",
                          borderRadius: "10px",
                          marginLeft: "17rem",
                        }}
                      >
                        <Loading />
                      </div>
                    ) : (
                      <button
                        className="btn add-btn"
                        style={{
                          marginTop: "2rem",
                          borderRadius: "10px",
                        }}
                        onClick={handleDataUpload}
                      >
                        UPLOAD EMPLOYEES
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>
            {excelData && (
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      {excelData[0].map((header, index) => (
                        <th key={index}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {excelData.slice(1).map((row, index) => (
                      <tr key={index}>
                        {row.map((cell, index) => (
                          <td key={index}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddThroughUpload;
