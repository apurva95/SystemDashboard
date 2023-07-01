import {
  CloseCircleOutlined,
  DashboardOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  PauseCircleOutlined,
  ReloadOutlined,
  WarningOutlined
} from "@ant-design/icons";
import { Player } from "@lottiefiles/react-lottie-player";
import {  Button, Col, DatePicker, Input, Radio, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import LoadingAnimation from "../assets/logsLoader.json";
import LogViewer from "../components/logview";

const { Search } = Input;
const { RangePicker } = DatePicker;

const plainOptions = [
  {
    label: (
      <>
        <PauseCircleOutlined />&nbsp;
        All
      </>
    ),
    value: "All"
  },
  {
    label: (
      <>
        <InfoCircleOutlined />&nbsp;Information
      </>
    ),
    value: "Information"
  },
  {
    label: (
      <>
        {" "}
        <WarningOutlined />&nbsp;Warning
      </>
    ),
    value: "Warning"
  },
  {
    label: (
      <>
        <CloseCircleOutlined />&nbsp;
        Error
      </>
    ),
    value: "Error"
  },
  {
    label: (
      <>
        <PauseCircleOutlined />&nbsp;
        Debug
      </>
    ),
    value: "Debug"
  },
  {
    label: (
      <>
        <ExclamationCircleOutlined />&nbsp;
        Critical
      </>
    ),
    value: "Critical"
  }
];

const Logs = () => {
  const [appID, setappID] = useState("");
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLevel, setcurrentLevel] = useState("All");

  const handleSearchLevel = async (/** @type {{ target: { value: any; }; }} */ e) => {
    if (!appID) {
      return;
    }
    try {
      message.loading("Loading...");
      const response = await fetch(`https://localhost:7135/api/search?uniqueId=${appID}&level=${e.target.value}`);
      const logsData = await response.json();
      setLogs(logsData);
      setIsLoading(false);
      message.destroy();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      message.destroy();
    }
  };
  const handleSearch = async (e) => {
    try {
      const response = await fetch(`https://localhost:7135/api/searchLogs?searchTerm=${e}&uniqueId=${appID}`);
      const logsData = await response.json();
      setLogs(logsData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  const onRangeChange = async (dates, dateStrings) => {
    try {
      if (dates) {
        const response = await fetch(
          `https://localhost:7135/api/searchLogsTimeRange?uniqueId=${appID}&from=${dateStrings[0]}&to=${dateStrings[1]}`
        );
        const logsData = await response.json();
        setLogs(logsData);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // get token_id from  local storage
    if (window && window.localStorage) {
      let token_id = window.localStorage.getItem("appID");
      if (token_id) {
        // redirect to dashboard
        setappID(token_id);
        handleSearchLevel({
          target: {
            value: "All"
          }
        });
      }
    }
  }, [appID]);
  return (
    <div>
      <div className="page-header">
        <DashboardOutlined /> Logs
      </div>
      <Row
        style={{
          padding: "10px",
          borderBottom: "1px solid #ccc"
        }}
      >
        <Col span={10}>
          <h3>Log Level</h3>
          <Radio.Group
            value={currentLevel}
            options={plainOptions}
            optionType="button"
            // @ts-ignore
            onChange={(e) => {
              setcurrentLevel(e.target.value);
              handleSearchLevel(e);
            }}
          />
        </Col>
        <Col span={5}>
          <h3>Time Range</h3>
          <RangePicker showTime onChange={onRangeChange} />
        </Col>
        <Col span={7} style={{
         paddingLeft: "10px"
        }}>
          <h3>Search</h3>
          <Search
            placeholder="input search text"
            onSearch={(value) => handleSearch(value)}
            enterButton 
            allowClear
          />
        </Col>
        <Col span={2} style={{
         paddingLeft: "10px"
        }}>
          <h3>&nbsp;</h3>

          <Button
            onClick={() => {
              setcurrentLevel("All");
              handleSearchLevel({
                target: {
                  value: "All"
                }
              });
            }}
          >
            <ReloadOutlined /> Refresh
          </Button>
        </Col>
      </Row>
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
        ) : logs.length > 0 ? (
          <LogViewer logs={logs} />
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
    </div>
  );
};

export default Logs;
