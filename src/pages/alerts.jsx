import React, {useEffect, useState} from "react";
import { AlertOutlined } from "@ant-design/icons";
import { Col, Row,Card } from "antd";
import AlertViewer from "../components/alertview";
import { Player } from "@lottiefiles/react-lottie-player";
import LoadingAnimation from "../assets/alertLoader.json";

const AlertsTab = () => {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [appID, setappID] = useState("");
  const fetchAlerts = async () => {
    setIsLoading(true); // Set loading to true at the start
    try {
      const response = await fetch(`https://logfetcher20230822191705.azurewebsites.net/api/alerts?uniqueId=${appID}`);
      const result = await response.json();
      setAlerts(result);
      setIsLoading(false);
      debugger;
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching data, regardless of success or failure
    }
  };
  useEffect(() => {
    if (window && window.sessionStorage) {
      let token_id = window.sessionStorage.getItem("appID");
      if (token_id) {
        // redirect to dashboard
        setappID(token_id);
      }
    }
  }, [appID]);
  useEffect (() => {
    fetchAlerts();
  },[appID]);
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
         <div
        style={{
          padding: "10px"
        }}
      >
        {isLoading ? (
          <div>
            <Player
              autoplay
              loop
              src={LoadingAnimation}
              style={{ height: "300px", width: "300px", marginTop: "12rem" }}
            />
          </div>
        ) : alerts.length > 0 ? (
          <><div>
              <AlertViewer alerts={alerts} />
          </div></>
        ) : (
          <>
            <Player
              autoplay
              loop
              src="https://assets10.lottiefiles.com/packages/lf20_qlwqp9xi.json"
              style={{ height: "300px", width: "300px", marginTop: "12rem" }}
            ></Player>
            <h3
              style={{
                textAlign: "center"
              }}
            >
              No Data is Available
            </h3>
          </>
        )}
      </div>
         </Col>
         <Col span={4}></Col>
      </Row>
    </div>
  );
};

export default AlertsTab;
