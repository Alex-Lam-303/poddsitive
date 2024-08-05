"use client";

import { App, ConfigProvider, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import LoginPage from "../layout/LoginPage";
import AppHeader from "../layout/AppHeader";
import AppContent from "../layout/AppContent";
import { onAuthStateChanged } from "firebase/auth";

const Poddsitive = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [user, setUser] = useState(null);

  const handleSetDemoMode = () => {
    setDemoMode(true);
  };

  const handleToSignUp = () => {
    setDemoMode(false);
  };

  useEffect(() => {
    setIsMounted(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (!isMounted) return <Spin />;
  if (user || demoMode) {
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
          <AppHeader
            style={{ height: "10vh" }}
            demoMode={demoMode}
            handleToSignUp={handleToSignUp}
          />
          <AppContent style={{ height: "90vh" }} demoMode={demoMode} />
        </App>
      </ConfigProvider>
    );
  } else {
    return <LoginPage setDemoMode={handleSetDemoMode} />;
  }
};

export default Poddsitive;
