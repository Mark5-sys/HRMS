import React, { Fragment, useEffect, useRef, useState } from "react";
import OrientItem from "./orient_item";
import { useSelector } from "react-redux";
import DeployOrienteeModal from "./deploy_orientee_modal";
import { useGetTraineesQuery } from "../../../store/api/traineeSlice";
import Loading from "../../../components/loader/loading";
import { downloadExcel } from "react-export-table-to-excel";

const OrinetsTable = () => {
  const header = [
    "First Name",
    "Last Name",
    "Gender",
    "National ID",
    "Marital Status",
  ];

  const {
    data: trainees,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTraineesQuery();

  const [orientName, setOrientName] = useState("");
  const [filteredOrients, setFilteredOrients] = useState([]);

  const handleSearch = () => {
    const filteredOrients = trainees.ids.filter((id) => {
      const trainee = trainees.entities[id];
      const nameMatch =
        orientName !== "" &&
        (trainee.first_name.toLowerCase().includes(orientName.toLowerCase()) ||
          trainee.last_name.toLowerCase().includes(orientName.toLowerCase()));

      const nationalIdMatch =
        orientName !== "" &&
        trainee.national_id.toLowerCase().includes(orientName.toLowerCase());

      return nameMatch || nationalIdMatch;
    });

    setFilteredOrients(filteredOrients);
  };

  const handleDownloadExcel = () => {
    const traineesArray = Object.values(trainees.entities);

    downloadExcel({
      fileName: "allOrients",
      sheet: "Orientation",
      tablePayload: {
        header,
        body: traineesArray,
      },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "orientName") {
      setOrientName(value);
    }
  };

  useEffect(() => {
    console.log("orients", trainees);
    if (orientName === "") {
      setFilteredOrients([]);
    } else {
      handleSearch();
    }
  }, [orientName]);

  let content;

  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = trainees.ids.map((id) => (
      <OrientItem key={id} orientee={trainees.entities[id]} />
    ));
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <Fragment>
      <div className="row filter-row">
        <div className="col-sm-6 col-md-8">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control floating"
              name="orientName"
              value={orientName}
              onChange={handleInputChange}
            />
            <label className="focus-label">Orient Name / Surname</label>
          </div>
        </div>

        <div className="col-sm-6 col-md-4">
          <div className="d-grid">
            <a className="btn btn-success"> Search </a>
          </div>
        </div>

        {/* <button onClick={handleDownloadExcel}> Export excel </button> */}
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <table className="table table-striped custom-table datatable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date of Orientation</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>National ID</th>
                    <th>Marital Status</th>
                    <th>Qualification</th>
                    <th>Phone Number(s)</th>
                    <th>Deployment Status</th>
                    <th className="text-end no-sort">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrients.length > 0
                    ? filteredOrients.map((orientee, index) => (
                        <OrientItem
                          key={orientee}
                          orientee={trainees.entities[orientee]}
                        />
                      ))
                    : content}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <DeployOrienteeModal />
      </div>
    </Fragment>
  );
};

export default OrinetsTable;
