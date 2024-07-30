import {
  GoogleOutlined,
  LockOutlined,
  FacebookOutlined,
  UserOutlined,
  AppleOutlined,
} from "@ant-design/icons";
import { ProConfigProvider, ProFormText } from "@ant-design/pro-components";
import { Button, Divider, Space, theme, message } from "antd";
import { useState } from "react";
import poddsitive_logo from "../assets/poddsitive_icons/dark_only_logo.png";
import {
  signInWithGoogle,
  signInWithFacebook,
  signInWithApple,
  signUpWithEmailAndPassword,
  loginWithEmailAndPassword,
  sendResetEmail,
} from "../firebase/auth";

const Page = () => {
  const { token } = theme.useToken();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const handleEmailPasswordLogin = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      message.error("Email cannot be empty.");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      message.error("Please enter a valid email address.");
      return;
    }
    try {
      await loginWithEmailAndPassword(trimmedEmail, password);
    } catch (error) {
      console.error("Login error:", error);
      message.error("Login failed. Please check your credentials.");
    }
  };

  const handleSignUp = async () => {
    try {
      await signUpWithEmailAndPassword(email, password);
      setIsSignUp(false);
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendResetEmail(email);
      message.success("Password reset email sent!");
      setIsForgotPassword(false);
    } catch (error) {
      message.error("Error sending password reset email. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f0f2f5",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.65)",
          padding: "40px",
          borderRadius: "8px",
          width: "400px",
          textAlign: "center",
        }}
      >
        <img
          src={poddsitive_logo.src}
          alt="Logo"
          style={{ width: "100px", marginBottom: "20px" }}
        />
        <h2 style={{ color: "white" }}>Poddsitive</h2>
        <p style={{ paddingBottom: "20px", color: token.colorTextPlaceholder }}>
          Positive EV. Positive Results.
        </p>
        {isForgotPassword ? (
          <>
            <ProFormText
              name="email"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined style={{ color: token.colorText }} />,
                onChange: (e) => setEmail(e.target.value),
              }}
              placeholder={"Email"}
              rules={[{ required: true, message: "Please enter your email!" }]}
              style={{ marginBottom: "16px" }}
            />
            <Button
              style={{ backgroundColor: "#499824", color: "white" }}
              block
              onClick={handleForgotPassword}
            >
              Reset Password
            </Button>
            <Button
              type="link"
              onClick={() => setIsForgotPassword(false)} // Go back to login
              style={{ color: token.colorTextPlaceholder }}
            >
              Back to Login
            </Button>
          </>
        ) : isSignUp ? (
          <>
            <ProFormText
              name="email"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined style={{ color: token.colorText }} />,
                onChange: (e) => setEmail(e.target.value),
              }}
              placeholder={"Email"}
              rules={[{ required: true, message: "Please enter your email!" }]}
              style={{ marginBottom: "16px" }}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined style={{ color: token.colorText }} />,
                onChange: (e) => setPassword(e.target.value),
              }}
              placeholder={"Password"}
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
              style={{ marginBottom: "24px" }}
            />
            <Button
              style={{ backgroundColor: "#499824", color: "white" }}
              block
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
            <Button
              type="link"
              onClick={() => setIsSignUp(false)} // Go back to login
              style={{ color: token.colorTextPlaceholder }}
            >
              Already have an account? Login
            </Button>
          </>
        ) : (
          <>
            <ProFormText
              name="email"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined style={{ color: token.colorText }} />,
                onChange: (e) => setEmail(e.target.value),
              }}
              placeholder={"Email"}
              rules={[{ required: true, message: "Please enter your email!" }]}
              style={{ marginBottom: "16px" }}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined style={{ color: token.colorText }} />,
                onChange: (e) => setPassword(e.target.value),
              }}
              placeholder={"Password"}
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
              style={{ marginBottom: "24px" }}
            />
            <Button
              style={{ backgroundColor: "#499824", color: "white" }}
              block
              onClick={handleEmailPasswordLogin}
            >
              Login
            </Button>
            <Button
              type="link"
              onClick={() => setIsForgotPassword(true)}
              style={{ paddingTop: "20px", color: token.colorTextPlaceholder }}
            >
              Forgot Password?
            </Button>
            <Button
              type="link"
              onClick={() => setIsSignUp(true)}
              style={{ color: token.colorTextPlaceholder }}
            >
              Don't have an account? Sign Up
            </Button>
          </>
        )}
        {/* 
        <Divider plain style={{ color: token.colorTextPlaceholder }}>
          Other Login Methods
        </Divider>
        <Space align="center" size={24}>
         
          <div style={iconContainerStyle}>
            <GoogleOutlined
              onClick={() => signInWithGoogle()}
              style={iconStyles}
            />
          </div>
          <div style={iconContainerStyle}>
            <FacebookOutlined
              onClick={() => signInWithFacebook()}
              style={iconStyles}
            />
          </div>
          <div style={iconContainerStyle}>
            <AppleOutlined
              onClick={() => signInWithApple()}
              style={iconStyles}
            />
          </div>
        </Space> */}
        <p
          style={{
            color: token.colorTextPlaceholder,
            fontSize: "12px",
            paddingTop: "20px",
          }}
        >
          Poddsitive is always 100% free to use.
          <br /> Simply sign up and use your own{" "}
          <a
            href="https://the-odds-api.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#499824", textDecoration: "underline" }}
          >
            OddsAPI
          </a>{" "}
          key.
        </p>
      </div>
    </div>
  );
};

export default () => {
  return (
    <ProConfigProvider dark>
      <Page />
    </ProConfigProvider>
  );
};

const iconStyles = {
  color: "#499824",
  fontSize: "18px",
  verticalAlign: "middle",
  cursor: "pointer",
};

const iconContainerStyle = {
  height: 40,
  width: 40,
  border: "1px solid #499824",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
