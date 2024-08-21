"use client";

import React from "react";
import { Layout, Button, Tooltip } from "antd";
import Image from "next/image";
import poddsitiveLogo from "../assets/poddsitive_icons/dark_with_name.png";
import { logoutOfPoddsitive } from "../firebase/auth";
import { LogoutOutlined } from "@ant-design/icons";

const { Header } = Layout;

const AppHeader = ({ demoMode, handleToSignUp }) => {
  return (
    <Header
      style={{
        background: "#343a4e",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 10px",
      }}
    >
      <Image
        src={poddsitiveLogo}
        alt="Poddsitive"
        layout="fixed"
        style={{ paddingRight: "10px", height: "100%", width: "auto" }}
      />
      {demoMode ? (
        <>
          <div style={{ color: "white", height: "100%" }}>
            Last Updated:{" "}
            {new Date().getHours() >= 17
              ? `${new Date().toLocaleString("default", {
                  month: "long",
                })} ${new Date().getDate()}, ${new Date().getFullYear()} 5:00pm EST`
              : `${new Date(Date.now() - 864e5).toLocaleString("default", {
                  month: "long",
                })} ${new Date(Date.now() - 864e5).getDate()}, ${new Date(
                  Date.now() - 864e5
                ).getFullYear()} 5:00:00pm EST`}
          </div>
          <Button onClick={() => handleToSignUp()} type="primary">
            Sign Up
          </Button>
        </>
      ) : (
        <Tooltip title="Log out" placement="left">
          <LogoutOutlined
            onClick={() => logoutOfPoddsitive()}
            style={{ color: "white", fontSize: "15px", paddingRight: "10px" }}
          />
        </Tooltip>
      )}
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
