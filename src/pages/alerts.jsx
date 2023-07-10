import React, {useEffect, useState} from "react";
import { AlertOutlined } from "@ant-design/icons";
import { Col, Row,Card } from "antd";
import AlertViewer from "../components/alertview";
const uniqueId='deloitte_usi-ui-wage-2c006383-679d-4148-87ce-a6b722c41734'


const AlertsTab = () => {
  const [alerts, setAlerts] = useState([]);
  const fetchAlerts = async () => {
    try {
      const response = await fetch(`https://localhost:7135/api/alerts?uniqueId=${uniqueId}`);
      const result = await response.json();
      setAlerts(result);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };
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
         <AlertViewer alerts={alerts} />
         </Col>
         <Col span={4}></Col>
      </Row>
    </div>
  );
};

export default AlertsTab;
