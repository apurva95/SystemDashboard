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
import { Button, Col, DatePicker, Input, Radio, Row, message, Dropdown, Menu } from "antd";
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
  const [timeFilter, setTimeFilter] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [refreshCount, setRefreshCount] = useState(1);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const handleDoc = async (docType) => {
    try {
      setLoadingPdf(true);
      const response = await fetch('https://localhost:7135/api/doc?' + new URLSearchParams({
        searchTerm: searchFilter,
        uniqueId: appID,
        type: currentLevel,
        fromDate: timeFilter[0]? timeFilter[0] : "",
        toDate: timeFilter[1] ? timeFilter[1] : "",
        docType: docType
}))
      if (!response.ok) {
        throw new Error("PDF generation failed");
      }
      // Generate the download URL for the PDF
      const downloadUrl = docType === 'pdf'?`https://loggerfiles.s3.eu-west-2.amazonaws.com/logFiles/${appID}`+".pdf":`https://loggerfiles.s3.eu-west-2.amazonaws.com/logFiles/${appID}`+".csv";

    // Create a link and trigger the download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.target = '_blank';  // Open the link in a new tab
    link.download = docType === 'pdf'? appID.toString() + '.pdf':appID.toString() + '.csv';  // provide the file name

    // This is where we simulate the user action
    document.body.appendChild(link);

    link.click();
    link.remove(); // remove the link when done
    } catch (error) {
      console.error("Error generating or downloading PDF:", error);
    } finally {
      setLoadingPdf(false);
    }
  };
    const handleFilters = async () => {
    if(!appID)
    {
      return;
    }
    try {
      const response = await fetch('https://localhost:7135/api/searchTest?' + new URLSearchParams({
        searchTerm: searchFilter,
        uniqueId: appID,
        type: currentLevel,
        fromDate: timeFilter[0]? timeFilter[0] : "",
        toDate: timeFilter[1] ? timeFilter[1] : ""
}))
      const logsData = await response.json();
      setLogs(logsData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect (() => {
    handleFilters();
  },[currentLevel,searchFilter,timeFilter,appID,refreshCount]);
  
  useEffect(() => {
    // get token_id from  local storage
    if (window && window.sessionStorage) {
      let token_id = window.sessionStorage.getItem("appID");
      if (token_id) {
        // redirect to dashboard
        setappID(token_id);
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
            }}
          />
        </Col>
        <Col span={5}>
          <h3>Time Range</h3>
          <RangePicker showTime onChange={(e)=>{
            debugger;
            setTimeFilter(e);
            handleFilters();
          }} />
        </Col>
        <Col span={7} style={{
          paddingLeft: "10px"
        }}>
          <h3>Search</h3>
          <Search
            placeholder="input search text"
            onSearch={(value) => {
              setSearchFilter(value);
              //handleFilters();
            }}
            onChange={(e) => {
              setSearchFilter(e.target.value);
            }}
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
              setRefreshCount(refreshCount+1);
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
          <><div>
             <LogViewer logs={logs} searchTerm={searchFilter} uniqueId={appID} type={currentLevel} timeFilter={timeFilter} />
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
    </div>
  );
};

export default Logs;
