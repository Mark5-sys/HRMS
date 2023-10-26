import { Fragment } from "react";
import PositionsItem from "./position_item";
import { useGetPositionsQuery } from "../../../store/api/apiSlice";
import Loading from "../../../components/loader/loading";

const PositionsTable = () => {
  const {
    data: pos,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPositionsQuery()

  let content

  if (isLoading) {
    content = <Loading />
  } else if (isSuccess) {
    content = pos.data.map((position) => (
      <PositionsItem key={position.id} position={position} />
    ))
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

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
            {content}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default PositionsTable;
