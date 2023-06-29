import React, { useEffect, useState } from 'react';
import { Pie, Bar, G2, Area } from '@ant-design/plots';

const VisualizationTab = ({ uniqueId }) => {
  const [logs, setLogs] = useState([]);
  const [configPie, setConfigForPie] = useState({});
  const [configBar, setConfigForBar] = useState({});
  const [configLine, setConfigForLine] = useState({});
  const [configLineError, setConfigForLineError] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const { registerTheme } = G2;
  registerTheme('custom-theme', {
    colors10: [
      '#025DF4',
      '#DB6BCF',
      '#2498D1',
      '#BBBDE6',
      '#4045B2',
      '#21A97A',
      '#FF745A',
      '#007E99',
      '#FFA8A8',
      '#2391FF',
    ],
    colors20: [
      '#025DF4',
      '#DB6BCF',
      '#2498D1',
      '#BBBDE6',
      '#4045B2',
      '#21A97A',
      '#FF745A',
      '#007E99',
      '#FFA8A8',
      '#2391FF',
      '#FFC328',
      '#A0DC2C',
      '#946DFF',
      '#626681',
      '#EB4185',
      '#CD8150',
      '#36BCCB',
      '#327039',
      '#803488',
      '#83BC99',
    ],
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
      const response = await fetch(`https://localhost:7135/api/visualisationLogs?uniqueId=${uniqueId}`);
      const result = await response.json();
      data = Object.entries(result).map(([type, value]) => ({
        type: `${type}`,
        value: value,
      }));
      const lineResponse = await fetch(`https://localhost:7135/api/visualisationLogsForLineGraph?uniqueId=${uniqueId}`);
      const lineResult = await lineResponse.json();
      lineData = Object.entries(lineResult).map(([type, value]) => ({
        type: `${type}`,
        count: value,
      }));
      const lineErrorResponse = await fetch(`https://localhost:7135/api/visualisationLogsForLineGraphError?uniqueId=${uniqueId}`);
      const lineErrorResult = await lineErrorResponse.json();
      lineErrorData = Object.entries(lineErrorResult).map(([type, value]) => ({
        type: `${type}`,
        count: value,
      }));
      debugger;
      configSetPie = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
          type: 'inner',
          offset: '-10%',
          content: '{percentage}',
        },
        interactions: [
          {
            type: 'element-active',
          },
        ],
        theme: 'custom-theme',
      };
      configSetBar = {
        appendPadding: 10,
        data,
        xField: 'value', // Field for the x-axis values
        yField: 'type', // Field for the y-axis values
        seriesField: 'type',
        barWidthRatio: 0.8,
    legend: {
      position: 'top-left',
    },
        interactions: [
          {
            type: 'element-active',
          },
        ],
        theme: 'custom-theme',
      };
      configSetLine  = {
        data: lineData,
        xField: 'type',
        yField: 'count',
        xAxis: {
          range: [0, 1],
        },
      };
      configSetLineError  = {
        data: lineErrorData,
        xField: 'type',
        yField: 'count',
        xAxis: {
          range: [0, 1],
        },
      };
    
      debugger;
      setLogs(data);
      setConfigForPie(configSetPie);
      setConfigForBar(configSetBar);
      setConfigForLine(configSetLine);
      setConfigForLineError(configSetLineError);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : logs.length > 0 ? (
        <div className="chart-container">
          <div className="chart-item">
            <Pie {...configPie} />
          </div>
          <div className="chart-item">
            <Bar {...configBar} />
          </div>
          <div className="chart-item">
            <Area {...configLine} />
          </div>
          <div className="chart-item">
            <Area {...configLineError} />
          </div>
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default VisualizationTab;