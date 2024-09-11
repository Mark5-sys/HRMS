import React from "react";
import PageHeader from "../../components/page_header";

const Tickets_pages = () => {
  return (
    <div>
      {" "}
      <div className="page-wrapper">
        <div className="content container-fluid">
          <PageHeader
            activePage={"Tickets"}
            modalName={"Add Ticket"}
            toggleModal={"#add_Ticket"}
          />
          <div class="row">
            <div class="col-md-12">
              <div class="card-group m-b-30">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex justify-content-between mb-3">
                      <div>
                        <span class="d-block">New Tickets</span>
                      </div>
                      <div>
                        <span class="text-success">+10%</span>
                      </div>
                    </div>
                    <h3 class="mb-3">112</h3>
                    <div class="progress height-five mb-2">
                      <div
                        class="progress-bar bg-primary w-70"
                        role="progressbar"
                        aria-valuenow="40"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex justify-content-between mb-3">
                      <div>
                        <span class="d-block">Solved Tickets</span>
                      </div>
                      <div>
                        <span class="text-success">+12.5%</span>
                      </div>
                    </div>
                    <h3 class="mb-3">70</h3>
                    <div class="progress height-five mb-2">
                      <div
                        class="progress-bar bg-primary w-70"
                        role="progressbar"
                        aria-valuenow="40"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex justify-content-between mb-3">
                      <div>
                        <span class="d-block">Open Tickets</span>
                      </div>
                      <div>
                        <span class="text-danger">-2.8%</span>
                      </div>
                    </div>
                    <h3 class="mb-3">100</h3>
                    <div class="progress height-five mb-2">
                      <div
                        class="progress-bar bg-primary w-70"
                        role="progressbar"
                        aria-valuenow="40"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex justify-content-between mb-3">
                      <div>
                        <span class="d-block">Pending Tickets</span>
                      </div>
                      <div>
                        <span class="text-danger">-75%</span>
                      </div>
                    </div>
                    <h3 class="mb-3">125</h3>
                    <div class="progress height-five mb-2">
                      <div
                        class="progress-bar bg-primary w-70"
                        role="progressbar"
                        aria-valuenow="40"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets_pages;
