// @ts-check
import React, { useRef, useState } from "react";
import { Form, Input, Button, Checkbox, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const onFinish = (values) => {};
  const onFinishFailed = (errorInfo) => {};
  const inputRef = useRef(null);
  const [inputStatus, setinputStatus] = useState("");
  const [appID, setappID] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const history = useNavigate();

  const doLogin = () => {
    setinputStatus("");
    setisLoading(true);
    if (!appID) {
      message.error("Please enter the app id");
      // focus on the input
      // @ts-ignore
      inputRef?.current?.focus();
      setinputStatus("error");
      setisLoading(false);

      return;
    } else {
      // check the url to validate the app id
      fetch(`https://localhost:7135/api/checkUniqueID?uniqueId=${appID}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            message.success("App ID is valid");
            // save to load local storage
            localStorage.setItem("appID", appID);
            history("/dashboard");
          } else {
            message.error("App ID is seems to be invalid");
            // focus on the input
            // @ts-ignore
            inputRef?.current?.focus();
            setisLoading(false);

            setinputStatus("error");
          }
          console.log(data);
        })
        .catch((err) => {
          message.error("App ID is seems to be invalid");
          // focus on the input
          // @ts-ignore
          inputRef?.current?.focus();
          setinputStatus("error");
          setisLoading(false);
        })
        .finally(() => {
          setisLoading(false);
        });
    }
  };
  return (
    <div className="login">
      <div
        style={{
          position: "absolute",
          top: "20%"
        }}
      >
        <img
          src="/logo.png"
          alt="logo"
          style={{
            width: 230,
            display: "block"
          }}
        />
      </div>
      <div
        style={{
          width: "300px"
        }}
      >
        <Typography.Title level={3}>Enter the App ID</Typography.Title>
        <Input
          width={300}
          ref={inputRef}
          // @ts-ignore
          status={inputStatus}
          onChange={(e) => setappID(e.target.value)}
        />
        <div className="mt-5">
          <Button type="primary" loading={isLoading} block onClick={doLogin}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
