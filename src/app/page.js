"use client";

import { App, ConfigProvider, Spin } from "antd";
import React, { useEffect, useState } from "react";
import AppHeader from "../layout/AppHeader";
import AppContent from "../layout/AppContent";

const MyApp = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <Spin />;
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#499824",
          //colorBgContainer: "#f6ffed",
        },
      }}
    >
      <App>
        <AppHeader style={{ height: "10vh" }} />
        <AppContent style={{ height: "90vh" }} />
      </App>
    </ConfigProvider>
  );
};

export default MyApp;
