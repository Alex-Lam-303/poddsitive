import React from "react";
import { Layout } from "antd";
import Dashboard from "../pages/Dashboard";

const { Content } = Layout;

const AppContent = () => {
  return (
    <Content style={{}}>
      <Dashboard />
    </Content>
  );
};

export default AppContent;
