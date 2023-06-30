//@ts-check
// import react
import React, { useEffect } from "react";
import { BookOutlined, DashboardOutlined, AlertOutlined } from "@ant-design/icons";
import { Col, Menu, Row, Skeleton } from "antd";
import { useState } from "react";
import AuthMiddleware from "../components/auth";
import Visualization from "./visualization";
import AlertsTab from "./alerts";
import Logs from "./logs";

// submenu keys of first level
const HomePage = () => {
  const [openKey, setOpenKey] = useState("visualise");
  const [appID, setappID] = useState("");

  useEffect(() => {
    // get token_id from  local storage
    if (window && window.localStorage) {
      let token_id = window.localStorage.getItem("appID");
      if (token_id) {
        // redirect to dashboard
        setappID(token_id);
      }
    }
  }, []);

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type
    };
  }
  const items = [
    getItem("Visualise", "visualise", <DashboardOutlined />),
    getItem("Alerts", "alerts", <AlertOutlined />),
    getItem("Logs", "logs", <BookOutlined />)
  ];

  return (
    <AuthMiddleware>
      <Row>
        <Col span={1}>
          <div className="menu-sider">
            <Menu
              mode="inline"
              theme="dark"
              inlineCollapsed={true}
              onClick={(e) => {
                setOpenKey(e.key);
              }}
              selectedKeys={[openKey]}
              style={{
                width: 63,
                height: "100vh"
              }}
              items={items}
            />
          </div>
        </Col>
        <Col span={23}>
          <div className="main-tabs">
          {!appID && (
            <>
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
            </>
          )}

          {openKey === "visualise" && <Visualization />}
          {openKey === "alerts" && <AlertsTab />}
          {openKey === "logs" && <Logs />}
          </div>
        </Col>
      </Row>
    </AuthMiddleware>
  );
};
export default HomePage;
