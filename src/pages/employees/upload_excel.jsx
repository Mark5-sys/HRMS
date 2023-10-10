import React, { Fragment, useState } from "react";
import * as XLSX from "xlsx";
import Loading from "../../components/loader/loading";

const AddThroughUpload = () => {
  const [excelData, setExcelData] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const uploadDataToBackend = ( data ) => {
    const transformedData = data.slice(1).map((row) => {
      return {
        code: row[0],
        first_name: row[1],
        surname: row[2],
        department: row[3],
        national_identification_no: row[4],
        marital_status: row[5],
        date_of_birth: row[6],
        gender: row[7],
        postal_city: row[8],
        phone_number_1: row[9],
        phone_number_2: row[10]
      };

      
    });
  }

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
                    <a href="admin-dashboard.html">Dashboard</a>
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
                      <div className="btn"  style={{
                        marginTop: "1.5rem",
                        borderRadius: "10px",
                        marginLeft: "17rem"
                      }}>
                        <Loading />
                      </div>
                    ) : (
                      <button
                        className="btn add-btn"
                        style={{
                          marginTop: "2rem",
                          borderRadius: "10px",
                        }}
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
