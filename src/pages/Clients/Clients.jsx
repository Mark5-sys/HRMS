import React from "react";
import PageHeader from "../../components/page_header";
import ClientsTable from "./Components/ClientsTable";

const Clients = () => {
  const clients = [
    {
      id: 1,
      name: "PHC",
      address: "123 Main St",
    },
    {
      id: 2,
      name: "Simbisa",
      address: "Newlands",
    },
    {
      id: 3,
      name: "Zibuko",
      address: "Harare",
    },
  ];
  return (
    <div>
      {" "}
      <div className="page-wrapper">
        <div className="content container-fluid">
          <PageHeader
            activePage={"Clients"}
            modalName={"Add Clients"}
            toggleModal={"#add_clients"}
          />
          <div className="row">
            <div className="col-md-12">
              <ClientsTable clients={clients} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;
