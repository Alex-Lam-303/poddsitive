"use client";

import React from "react";
import { Layout } from "antd";
import Dashboard from "./Dashboard";

const { Content } = Layout;

const AppContent = () => {
  return (
    <Content>
      <Dashboard />
    </Content>
  );
};

export default AppContent;
