import React, { useEffect, useState } from "react";
import { Pie, Bar, G2, Area } from "@ant-design/plots";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import LoadingAnimation from "../assets/loading.json";
import { Skeleton, Result } from "antd";
// import lottie player

const VisualizationTab = ({ uniqueId }) => {
  const [logs, setLogs] = useState([]);
  const [configPie, setConfigForPie] = useState({});
  const [configBar, setConfigForBar] = useState({});
  const [configLine, setConfigForLine] = useState({});
  const [configLineError, setConfigForLineError] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [loading1, setloading1] = useState(false);
  const [loading2, setloading2] = useState(false);
  const [loading3, setloading3] = useState(false);
  const [loading4, setloading4] = useState(false);
  const [isError, setisError] = useState(false);

  useEffect(() => {
    if(!uniqueId){
      return;
    }
    fetchLogs();
  }, [uniqueId]);

  const { registerTheme } = G2;
  registerTheme("custom-theme", {
    colors10: [
      "#025DF4",
      "#DB6BCF",
      "#2498D1",
      "#BBBDE6",
      "#4045B2",
      "#21A97A",
      "#FF745A",
      "#007E99",
      "#FFA8A8",
      "#2391FF"
    ],
    colors20: [
      "#025DF4",
      "#DB6BCF",
      "#2498D1",
      "#BBBDE6",
      "#4045B2",
      "#21A97A",
      "#FF745A",
      "#007E99",
      "#FFA8A8",
      "#2391FF",
      "#FFC328",
      "#A0DC2C",
      "#946DFF",
      "#626681",
      "#EB4185",
      "#CD8150",
      "#36BCCB",
      "#327039",
      "#803488",
      "#83BC99"
    ]
  });
  let data = [];
  let lineData = [];
  let lineErrorData = [];
  let configSetPie = {};
  let configSetBar = {};
  let configSetLine = {};
  let configSetLineError = {};

  const fetchLogs = async () => {
    try {
      setloading1(true);
      const response = await fetch(`https://localhost:7135/api/visualisationLogs?uniqueId=${uniqueId}`);
      const result = await response.json();
      data = Object.entries(result).map(([type, value]) => ({
        type: `${type}`,
        value: value
      }));
      setloading1(false);
      setloading2(true);
      const lineResponse = await fetch(`https://localhost:7135/api/visualisationLogsForLineGraph?uniqueId=${uniqueId}`);
      const lineResult = await lineResponse.json();
      lineData = Object.entries(lineResult).map(([type, value]) => ({
        type: `${type}`,
        count: value
      }));
      setloading2(false);
      setloading3(true);
      const lineErrorResponse = await fetch(
        `https://localhost:7135/api/visualisationLogsForLineGraphError?uniqueId=${uniqueId}`
      );
      const lineErrorResult = await lineErrorResponse.json();
      lineErrorData = Object.entries(lineErrorResult).map(([type, value]) => ({
        type: `${type}`,
        count: value
      }));
      setloading3(false);

      configSetPie = {
        appendPadding: 10,
        data,
        angleField: "value",
        colorField: "type",
        radius: 0.8,
        label: {
          type: "inner",
          offset: "-10%",
          content: "{percentage}"
        },
        interactions: [
          {
            type: "element-active"
          }
        ],
        theme: "custom-theme"
      };
      configSetBar = {
        appendPadding: 10,
        data,
        xField: "value", // Field for the x-axis values
        yField: "type", // Field for the y-axis values
        seriesField: "type",
        barWidthRatio: 0.8,
        legend: {
          position: "top-left"
        },
        interactions: [
          {
            type: "element-active"
          }
        ],
        theme: "custom-theme"
      };
      configSetLine = {
        data: lineData,
        xField: "type",
        yField: "count",
        xAxis: {
          range: [0, 1]
        }
      };
      configSetLineError = {
        data: lineErrorData,
        xField: "type",
        yField: "count",
        xAxis: {
          range: [0, 1]
        }
      };

      setLogs(data);
      setConfigForPie(configSetPie);
      setConfigForBar(configSetBar);
      setConfigForLine(configSetLine);
      setConfigForLineError(configSetLineError);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching logs:", error);
      setisError(true);
    }
  };

  return (
    <div>
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
        <div className="chart-container">
          <div className="chart-item">
            {loading1 && <Skeleton active paragraph={{ rows: 10 }} />}
            {!loading1 && <><h2>Number of Logs Per Day</h2> <Pie {...configPie} title="Pie Chart for Log Levels" /></>}
          </div>
          <div className="chart-item">
            {loading1 && <Skeleton active paragraph={{ rows: 10 }} />}
            {!loading1 &&<><h2>Number of Logs Per Day</h2> <Bar {...configBar} /></>}
          </div>
          <div className="chart-item">
            {loading2 && <Skeleton active paragraph={{ rows: 10 }} />}
            {!loading2 &&<><h2>Number of Logs Per Day</h2> <Area {...configLine} title="Chart for Number of Logs Per Day"/></>}
          </div>
          <div className="chart-item">
            {loading3 && <Skeleton active paragraph={{ rows: 10 }} />}
            {!loading3 &&<><h2>Error/Critical Logs per 3 hrs</h2> <Area {...configLineError} title="Chart for Error/Critical per 3 hrs"/></>}
          </div>
        </div>
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
      {!isLoading && isError && (
        <Result status="500" title="500" subTitle="Sorry, something went wrong." />
      )}
    </div>
  );
};

export default VisualizationTab;
