import React, { Fragment, useEffect, useState } from "react";
import PageHeader from "../../components/page_header";
import PositionsTable from "./components/positions_table";
import AddPositionForm from "./forms/add_position_form";

const PositionsPage = ({}) => {
  return (
    <Fragment>
      <div class="page-wrapper">
        <div class="content container-fluid">
          <PageHeader
            activePage={"Positions"}
            modalName={"Add Position"}
            toggleModal={"#add_position"}
          />
          <div class="row">
            <div class="col-md-12">
              <PositionsTable />
            </div>
          </div>

          <AddPositionForm />
        </div>
      </div>
    </Fragment>
  );
};

export default PositionsPage;
