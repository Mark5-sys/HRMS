import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BirthdayCard = ({ employee }) => {
  const [dob, setDob] = useState(null);
  const [turningAge, setTurningAge] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState(null);

  useEffect(() => {
    const calculateBirthdays = () => {
      const today = new Date();
      const currentYear = today.getFullYear();

      const dob = new Date(employee.date_of_birth);
      const birthdayThisYear = new Date(
        currentYear,
        dob.getMonth(),
        dob.getDate()
      );

      let age = currentYear - dob.getFullYear();
      if (today < birthdayThisYear) {
        age--;
      }

      const dayOfWeek = birthdayThisYear.toLocaleDateString("en-US", {
        weekday: "long",
      });

      const birthDay = dob.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      });

      setDob(birthDay);
      setDayOfWeek(dayOfWeek);
      setTurningAge(age);

      console.log(
        `${employee.first_name} ${
          employee.surname
        }'s birthday is on ${dob.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        })}, ${currentYear}. They will be turning ${age + 1} years old on their birthday this year. The day of the week will be: ${dayOfWeek}`
      );
    };

    calculateBirthdays();
  }, [employee]);

  return (
    <Fragment>
      <div className="dash-section">
        <div className="dash-sec-content">
          <div className="dash-info-list">
            <a className="dash-card text-danger">
              <div className="dash-card-container">
                <div className="dash-card-icon">
                  <i
                    class="fa-solid fa-cake-candles"
                    style={{
                      color: "green",
                    }}
                  ></i>
                </div>
                <div className="dash-card-content">
                  <p
                    style={{
                      color: "#000",
                      fontSize: "14px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Cooper Black'",
                        fontSize: "17px",
                      }}
                    >
                      {employee.first_name} {employee.surname}
                    </span>{" "}
                    {"will be turning"}{" "}
                    <span className="age-circle">{turningAge + 1}</span> on{" "}
                    <span
                      style={{
                        fontFamily: "'Cooper Black'",
                        fontSize: "17px",
                      }}
                    >
                      {dayOfWeek} {dob}
                    </span>
                  </p>
                </div>
                <div className="dash-card-avatars">
                  <div className="e-avatar">
                    <img src="assets/img/user.jpg" alt="User Image" />
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BirthdayCard;
