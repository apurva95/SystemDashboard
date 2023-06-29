import React, { useState, useEffect, useCallback } from 'react';
import { Alert, Space } from 'antd'
import VisualizationTab from './VisualizationTab';
import SearchLogs from './SearchLogs';

const Dashboard = ({ uniqueId }) => {
  const [activeTab, setActiveTab] = useState('alerts');
  const [alerts, setAlerts] = useState([]);
  const [logs, setLogs] = useState([]);
  const [fetchedData, setFetchedData] = useState({ alerts: false, logs: false });

  const fetchAlertsAndLogs = useCallback(async (tab) => {
    if (tab === "alerts" && !fetchedData.alerts) {
      const alertsResponse = await fetch(`/api/alerts?uniqueId=${uniqueId}`);
      const alertsData = await alertsResponse.json();
      setAlerts(alertsData);
      setFetchedData({ ...fetchedData, alerts: true });
    } else if (tab === "logs" && !fetchedData.logs) {
      const logsResponse = await fetch(`/api/logs?uniqueId=${uniqueId}`);
      const logsData = await logsResponse.json();
      setLogs(logsData);
      setFetchedData({ ...fetchedData, logs: true });
    }
  }, [uniqueId, fetchedData]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    fetchAlertsAndLogs(tab);
  };

  return (
    <div className="dashboard-container">
      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === 'alerts' ? 'active' : ''}`}
          onClick={() => handleTabChange('alerts')}
        >
          Alerts
        </button>
        <button
          className={`tab-button ${activeTab === 'logs' ? 'active' : ''}`}
          onClick={() => handleTabChange('logs')}
        >
          Logs
        </button>
        <button
          className={`tab-button ${activeTab === 'visualize' ? 'active' : ''}`}
          onClick={() => handleTabChange('visualize')}
        >
          Visualize
        </button>
      </div>
      <div className="content-container">
        {activeTab === 'alerts' && (
          <div className="alerts-container">
            <h2>Alerts</h2>
            {alerts.length > 0 ? (
              alerts.map((alert) => (
                <div className="alert">{alert.message}</div>
              ))
            ) : (
              <div className="no-data">No Data</div>
            )}
          </div>
        )}
        {activeTab === 'logs' && (
          <div>
            <h2>Logs</h2>
            <SearchLogs uniqueId={uniqueId}/>
            {logs.length > 0 ? (
              logs.map((log) => (
                // <div
                //   className={`alert ${
                //     log.type === 'error' ? 'error' : 'warning'
                //   }`}
                // >
                //   {log.message}
                // </div>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Alert message={log.message} type={log.level} showIcon/>
                </Space>
              ))
            ) : (
              <div className="no-data">No Data</div>
            )}
          </div>
        )}
        {activeTab === 'visualize' && (
          <div className="logs-container">
            <h2>Visualize</h2>
            <VisualizationTab uniqueId={uniqueId}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;