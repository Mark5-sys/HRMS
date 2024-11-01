import React, { useEffect, useState } from 'react'
import PageHeader from "../../components/page_header";
import TimeEntry from '../../components/TimeEntry';

const TimeEntryPage = () => {
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    // Function to update the greeting based on the current hour
    const updateGreeting = () => {
      const currentHour = new Date().getHours();

      if (currentHour < 12) {
        setGreeting("Good Morning");
      } else if (currentHour < 18) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }
    };

    // Function to update the current time every second
    const updateTime = () => {
      setCurrentTime(new Date());
    };

    // Call the updateGreeting function initially
    updateGreeting();

    // Set interval to update the time every second
    const timeInterval = setInterval(() => {
      updateTime();
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timeInterval);
  }, []);

  return (
    <>
    <div className="page-wrapper">
        <div className="content container-fluid">
          <PageHeader
            activePage={"Time"}
            modalName={"Add Time"}
            toggleModal={"#add_time"}
          />
          <section className="content">
          
        </section>
          <TimeEntry />
        </div>
      </div>
    </>
  )
}

export default TimeEntryPage



