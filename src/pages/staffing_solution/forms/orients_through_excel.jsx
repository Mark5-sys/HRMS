import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as XLSX from "xlsx";
import Loading from "../../../components/loader/loading";
import { API } from "../../../config";
import { toast } from "react-toastify";

const AddOrientsThroughExcel = ({}) => {
  const [excelData, setExcelData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [successCounter, setSuccessCounter] = useState(0);

  const dispatch = useDispatch();
  const handleOrientsExcelUpload = (event) => {
    event.preventDefault();
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

  const uploadDataToBackend = async (data) => {
    const transformedData = data.slice(1).map((row) => {
      const deployemntStatus = "Pending";
      const dateValue =
        row[7] !== "N/A"
          ? parseInt((row[7] - 25569) * 86400 * 1000)
          : Date.now();
      const date = new Date(dateValue);

      let date_of_birth;

      if (!isNaN(date)) {
        // Check if date is a valid date object
        date_of_birth = date.toISOString().substring(0, 10);
      } else {
        // Handle the case when date is not a valid date
        date_of_birth = null; // or any other default value or handling logic
      }

      const createdAtValue =
        row[1] !== "N/A"
          ? parseInt((row[1] - 25569) * 86400 * 1000)
          : Date.now();
      const crtAt = new Date(createdAtValue);

      let created_at;

      if (!isNaN(crtAt)) {
        created_at = crtAt;
      } else {
        created_at = Date.now();
      }

      return {
        first_name: row[2],
        last_name: row[3],
        national_id: row[5],
        marital_status: row[6],
        date_of_birth: date_of_birth,
        gender: row[8],
        qualifications: row[9],
        deployement_status: deployemntStatus,
        address: row[12],
        phone_1: row[13],
        created_at: created_at,
      };
    });

    for (const newOrient of transformedData) {
      try {
        console.log("newOrient: " + JSON.stringify(newOrient));
        // console.log("date: " + newDate);
        const response = await fetch(`${API}/orientation`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newOrient),
        });

        if (response.ok) {
          // If the request was successful, increment the success counter
          setSuccessCounter((prevCounter) => prevCounter + 1);
          toast.success(`Orient Added Successfully`);
        }
      } catch (error) {
        console.log("Upload error:", error);
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  };

  const handleUploadDataToBackend = (e) => {
    e.preventDefault();
    if (excelData) {
      setLoading(true);
      uploadDataToBackend(excelData);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Add Orientees Through Excel</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a>Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active">Excel Upload</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container_">
            <h4>Upload Excel Sheet</h4>
            <p>{`Successfully added ${successCounter} orientees.`}</p>

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
                        onChange={handleOrientsExcelUpload}
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
                        onClick={handleUploadDataToBackend}
                      >
                        UPLOAD ORIENTS
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
    </>
  );
};

export default AddOrientsThroughExcel;
