import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { orientActions } from "../../store/orients_store";
import OrienteeProfileCard from "./components/OrienteeProfileCard";

const OrienteeDetail = () => {
  const { orienteeId } = useParams();
  const dispatch = useDispatch();

  const orients = useSelector((state) => state.orientation.orients) || [];

  const findOrienteeById = (id) => {
    return orients.find((orientee) => orientee.id === id);
  };

  useEffect(() => {
    const singleOrientee = findOrienteeById(parseInt(orienteeId));
    dispatch(
      orientActions.setSingleSingleOrient({
        singleOrient: singleOrientee,
      })
    );
  }, [orients, orienteeId]);

  const orientee = useSelector((state) => state.orientation.singleOrient) || {};

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
            {orientee && <OrienteeProfileCard orientee={orientee} />}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrienteeDetail;
