import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PositionsItem from "./position_item";

const PositionsTable = ({}) => {
  const positions = useSelector((state) => state.position.positions);
  return (
    <Fragment>
      <div>
        <table className="table table-striped custom-table mb-0 datatable">
          <thead>
            <tr>
              <th className="width-thirty">#</th>
              <th>Position Name</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position, index) => (
              <PositionsItem key={position.id} position={position} />
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default PositionsTable;
