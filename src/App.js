import "./App.css";
import { App, ConfigProvider } from "antd";
import React from "react";
import AppHeader from "./layout/AppHeader";
import AppContent from "./layout/AppContent";

const MyApp = () => (
  <ConfigProvider
    theme={{
      token: {
        // Seed Token
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

export default MyApp;
