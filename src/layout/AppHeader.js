import React from "react";
import { Layout, Menu } from "antd";
import poddsitiveLogo from "../assets/poddsitive_icons/dark_with_name.png";

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header
      style={{
        background: "#343a4e",
        height: "8vh",
        display: "flex",
        alignItems: "center",
        padding: "0 10px",
      }}
    >
      <img
        style={{ height: "7vh", paddingRight: "10px" }}
        src={poddsitiveLogo}
        alt="Poddsitive"
      />
      <div style={{ height: "7vh", flex: 1 }}>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ background: "transparent", color: "#f0f0f0" }}
        >
          <Menu.Item key="1" style={{ color: "#f0f0f0" }}>
            Home
          </Menu.Item>
          <Menu.Item key="2" style={{ color: "#f0f0f0" }}>
            Odds
          </Menu.Item>
          <Menu.Item key="3" style={{ color: "#f0f0f0" }}>
            Settings
          </Menu.Item>
          <Menu.Item key="4" style={{ color: "#f0f0f0" }}>
            Help
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  );
};

export default AppHeader;
