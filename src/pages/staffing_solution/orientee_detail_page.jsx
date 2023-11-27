import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { orientActions } from "../../store/orients_store";
import OrienteeProfileCard from "./components/OrienteeProfileCard";
import { useGetTraineesQuery } from "../../store/api/traineeSlice";

const OrienteeDetail = () => {
  const { orienteeId } = useParams();
  const dispatch = useDispatch();

  const {
    data: trainees,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTraineesQuery();

  const findOrienteeById = (id) => {
    return trainees.entities[id];
  };
  const singleOrientee = findOrienteeById(parseInt(orienteeId));

  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Orientee Profile</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="admin-dashboard.html">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active">Profile</li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className="row"
            style={{
              marginBottom: "40px",
            }}
          >
            {singleOrientee && (
              <OrienteeProfileCard orientee={singleOrientee} />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrienteeDetail;
