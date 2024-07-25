"use client";

import React from "react";
import { Layout, Menu, Row, Col } from "antd";
import Image from "next/image";
import poddsitiveLogo from "../assets/poddsitive_icons/dark_with_name.png";

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header
      style={{
        background: "#343a4e",
        display: "flex",
        alignItems: "center",
        padding: "0 10px",
      }}
    >
      <Image
        src={poddsitiveLogo}
        alt="Poddsitive"
        style={{ paddingRight: "10px", height: "100%", width: "auto" }}
      />
      {/*  <Menu
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        style={{ background: "transparent", color: "#f0f0f0", width: "100%" }}
      >
        <Menu.Item key="1" style={{ color: "#f0f0f0" }}>
          Dashboard
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
      </Menu> */}
    </Header>
  );
};

export default AppHeader;
