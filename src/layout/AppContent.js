"use client";

import React from "react";
import { Layout } from "antd";
import Dashboard from "./Dashboard";

const { Content } = Layout;

const AppContent = ({ demoMode }) => {
  return (
    <Content>
      <Dashboard demoMode={demoMode} />
    </Content>
  );
};

export default AppContent;
