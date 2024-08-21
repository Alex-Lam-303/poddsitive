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
  signUpPoddsitive,
  loginWithEmailAndPassword,
  sendResetEmail,
} from "../firebase/auth";

const LoginPage = ({ setDemoMode }) => {
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
      const user = await signUpPoddsitive("email", email, password);
      setIsSignUp(false);
    } catch (error) {
      message.error(error.message || "An error occurred during sign up.");
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
    <ProConfigProvider dark>
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
          <p style={{ paddingBottom: "20px", color: "#a9a9a9" }}>
            Positive EV. Positive Results.
          </p>
          {isForgotPassword ? (
            <>
              <ProFormText
                name="email"
                fieldProps={{
                  size: "large",
                  prefix: <UserOutlined style={{ color: "#a9a9a9" }} />,
                  onChange: (e) => setEmail(e.target.value),
                }}
                placeholder={"Email"}
                rules={[
                  { required: true, message: "Please enter your email!" },
                ]}
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
                onClick={() => setIsForgotPassword(false)}
                style={{ color: "#a9a9a9" }}
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
                  prefix: <UserOutlined style={{ color: "#a9a9a9" }} />,
                  onChange: (e) => setEmail(e.target.value),
                }}
                placeholder={"Email"}
                rules={[
                  { required: true, message: "Please enter your email!" },
                ]}
                style={{ marginBottom: "16px", backgroundColor: "#f0f0f0" }} // Added background color
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: "large",
                  prefix: <LockOutlined style={{ color: "#a9a9a9" }} />,
                  onChange: (e) => setPassword(e.target.value),
                }}
                placeholder={"Password"}
                rules={[
                  { required: true, message: "Please enter your password!" },
                ]}
                style={{ marginBottom: "24px", backgroundColor: "#f0f0f0" }} // Added background color
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
                style={{ color: "#a9a9a9" }}
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
                  prefix: <UserOutlined style={{ color: "#a9a9a9" }} />,
                  onChange: (e) => setEmail(e.target.value),
                }}
                placeholder={"Email"}
                rules={[
                  { required: true, message: "Please enter your email!" },
                ]}
                style={{ marginBottom: "16px" }}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: "large",
                  prefix: <LockOutlined style={{ color: "#a9a9a9" }} />,
                  onChange: (e) => setPassword(e.target.value),
                }}
                placeholder={"Password"}
                rules={[
                  { required: true, message: "Please enter your password!" },
                ]}
                style={{ marginBottom: "24px" }}
              />
              <Button
                style={{
                  backgroundColor: "#499824",
                  borderColor: "#499824",
                  color: "white",
                }}
                block
                onClick={handleEmailPasswordLogin}
              >
                Login
              </Button>
              <Button
                type="link"
                onClick={() => setIsForgotPassword(true)}
                style={{
                  paddingTop: "20px",
                  color: "#a9a9a9",
                }}
              >
                Forgot Password?
              </Button>
              <Button
                type="link"
                onClick={() => setIsSignUp(true)}
                style={{ color: "#a9a9a9" }}
              >
                Don't have an account? Sign Up
              </Button>
            </>
          )}
          {/* <Divider plain style={{ color: "#a9a9a9" }}>
            Other Login Methods
          </Divider>
          <Space align="center" size={24}>
            <div style={iconContainerStyle}>
              <GoogleOutlined
                onClick={() => signUpPoddsitive("google")}
                style={iconStyles}
              />
            </div>
            <div style={iconContainerStyle}>
              <FacebookOutlined
                onClick={() => signUpPoddsitive("facebook")}
                style={iconStyles}
              />
            </div>
            <div style={iconContainerStyle}>
              <AppleOutlined
                onClick={() => signUpPoddsitive("apple")}
                style={iconStyles}
              />
            </div>
          </Space> */}
          <p
            style={{
              color: "#a9a9a9",
              fontSize: "12px",
              paddingTop: "20px",
              paddingBottom: "20px",
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
          <Button
            onClick={() => {
              setDemoMode(true);
            }}
            style={{
              borderColor: "#499824",
              color: "white",
            }}
          >
            See Demo
          </Button>
        </div>
      </div>
    </ProConfigProvider>
  );
};

export default LoginPage;

const iconStyles = {
  color: "white",
  fontSize: "18px",
  verticalAlign: "middle",
  cursor: "pointer",
};

const iconContainerStyle = {
  height: 40,
  width: 40,
  backgroundColor: "black",
  border: "1px solid #499824",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
