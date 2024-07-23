import React, { Component } from "react";
import MainTable from "../components/MainTable";
import Selector from "../components/Selector";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Selector />
        <MainTable />
      </div>
    );
  }
}

export default Dashboard;
