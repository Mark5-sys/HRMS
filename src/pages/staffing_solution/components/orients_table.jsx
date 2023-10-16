import React, { Fragment, useEffect, useState } from "react";
import OrientItem from "./orient_item";
import { useSelector } from "react-redux";
import DeployOrienteeModal from "./deploy_orientee_modal";

const OrinetsTable = () => {
  const allOrients = useSelector((state) => state.orientation.orients);

  const [orientName, setOrientName] = useState("");
  const [filteredOrients, setFilteredOrients] = useState([]);

  const handleSearch = () => {
    const filteredOrients = allOrients.filter((orient) => {
      const nameMatch =
        orientName !== "" &&
        (orient.first_name.toLowerCase().includes(orientName.toLowerCase()) ||
          orient.last_name.toLowerCase().includes(orientName.toLowerCase()));

      return nameMatch;
    });

    setFilteredOrients(filteredOrients);
    console.log(filteredOrients);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "orientName") {
      setOrientName(value);
    }
  };

  useEffect(() => {
    if (orientName === "") {
      setFilteredOrients([]);
    } else {
      handleSearch();
    }
  }, [orientName]);

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
                    <th>Qualification</th>
                    <th>Phone Number</th>
                    <th>Deployment Status</th>
                    <th className="text-end no-sort">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrients.length > 0
                    ? filteredOrients.map((orientee, index) => (
                        <OrientItem key={orientee.id} orientee={orientee} />
                      ))
                    : allOrients.map((orientee, index) => (
                        <OrientItem key={orientee.id} orientee={orientee} />
                      ))}
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
