import React from "react";
import { AlertOutlined } from "@ant-design/icons";
import { Col, Row,Card } from "antd";

const AlertsTab = () => {
  return (
    <div>
      <div className="page-header">
        <AlertOutlined /> Alerts
      </div>
      <Row style={{
         padding: "10px",
      }}>
         <Col span={4}></Col>
         <Col span={16}>
            <Card hoverable>
               <h3>Alerts</h3>
            </Card>
         </Col>
         <Col span={4}></Col>
      </Row>
    </div>
  );
};

export default AlertsTab;
