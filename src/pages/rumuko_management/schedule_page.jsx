import React, { Fragment } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import enUS from "date-fns/locale/en-US";
import { Link } from "react-router-dom";
import AssignRumuko from "./assign_rumuko_form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRumukoSchedule } from "../../services/api";
import { rumukoScheduleActions } from "../../store/rumuko_store";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const eventStyleGetter = (event, start, end, isSelected) => {
  const backgroundColor = "#58AD46";
  const style = {
    backgroundColor,
    borderRadius: "5px",
    opacity: 0.8,
    color: "white",
    border: "0px",
    display: "block",
  };
  return {
    style,
  };
};

const SchedulerPage = () => {
  const dispatch = useDispatch();

  const schedule = useSelector((state) => state.rumuko.rumukoSchedule) || [];

  useEffect(() => {
    const fetchSchedule = async () => {
      const schedule = await getRumukoSchedule();
      dispatch(
        rumukoScheduleActions.setRumukoSchedule({
          rumukoSchedule: schedule,
        })
      );
    };

    fetchSchedule();
  }, []);

  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Shift Schedule</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={"/"}>Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Add To Schedule</li>
                </ul>
              </div>
              <div className="col-auto float-end ms-auto">
                <a
                  className="btn add-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#add_schedule"
                >
                  <i className="fa-solid fa-plus"></i> Scheduling
                </a>
                <div className="view-icons"></div>
              </div>
            </div>
          </div>
          <Calendar
            localizer={localizer}
            events={schedule}
            startAccessor="start"
            endAccessor="end"
            eventPropGetter={eventStyleGetter} // Set event style
            style={{
              height: 650,
              margin: "50px",
            }}
            
          />
        </div>
      </div>

      <AssignRumuko />
    </Fragment>
  );
};

export default SchedulerPage;
