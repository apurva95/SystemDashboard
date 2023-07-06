import React, {useEffect, useState} from "react";
import { AlertOutlined } from "@ant-design/icons";
import { Col, Row,Card } from "antd";
const uniqueId='deloitte_usi-ui-wage-2c006383-679d-4148-87ce-a6b722c41734'
const fetchAlerts = async () => {
  try {
    const response = await fetch(`https://localhost:7135/api/alerts?uniqueId=${uniqueId}`);
    const result = await response.json();
  } catch (error) {
    console.error("Error fetching logs:", error);
  }
};
const AlertsTab = () => {
  useEffect(() => {
    if(!uniqueId){
      return;
    }
    fetchAlerts();
  }, [uniqueId]);
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
