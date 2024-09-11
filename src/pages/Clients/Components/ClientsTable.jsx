import React from "react";
import ClientsItem from "./ClientsItem";

const ClientsTable = ({ clients }) => {
  return (
    <div>
      <table className="table table-striped custom-table mb-0 datatable">
        <thead>
          <tr>
            <th className="width-thirty">#</th>
            <th>Clients Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Contant</th>
            <th>Email</th>
            <th>Designation</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {clients && clients.map((client) => <ClientsItem client={client} />)}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsTable;
