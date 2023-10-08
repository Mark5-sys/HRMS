import { Fragment, useEffect, useState } from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";

const HomePage = ({}) => {
  return (
    <Fragment>
      <div className="main-wrapper">
        <Header />
        <SideBar />
        <Outlet />
      </div>
    </Fragment>
  );
};

export default HomePage;
