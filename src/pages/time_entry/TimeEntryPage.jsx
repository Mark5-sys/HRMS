import React from 'react'
import PageHeader from "../../components/page_header";
import TimeEntry from '../../components/TimeEntry';

const TimeEntryPage = () => {
  return (
    <>
    <div className="page-wrapper">
        <div className="content container-fluid">
          <PageHeader
            activePage={"Time"}
            modalName={"Add Time"}
            toggleModal={"#add_time"}
          />
          <TimeEntry />
        </div>
      </div>
    </>
  )
}

export default TimeEntryPage



