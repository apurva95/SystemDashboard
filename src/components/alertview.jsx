import React from "react";
import { Card, Pagination } from "antd";
import { useEffect, useState } from "react";

const AlertViewer = (props) => {
  const { alerts } = props;
  const [totalAlerts, setTotalAlerts] = useState();
  const [currentPage, setcurrentPage] = useState(1);
  const [alertsPerPage, setAlertsPerPage] = useState(10);
  const [currentSets, setcurrentSets] = useState([]);

  useEffect(() => {
    setTotalAlerts(alerts.length);
    setcurrentSets(alerts.slice(0, alertsPerPage));
  }, [alerts]);

  useEffect(() => {
    const indexOfLastLog = currentPage * alertsPerPage;
    const indexOfFirstLog = indexOfLastLog - alertsPerPage;
    setcurrentSets(alerts.slice(indexOfFirstLog, indexOfLastLog));
  }, [currentPage, alertsPerPage]);

  function highlightText(text, highlight) {
    if (!highlight) {
      return text;
  }
  highlight = highlight.toString();
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return <span> { parts.map((part, i) => 
        <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { backgroundColor: 'yellow' } : {} }>
            { part }
        </span>)
    } </span>;
}
  return (
    <div>
      {currentSets.map((alert) => (
         <Card hoverable>
         <h3>{alert.body}</h3>
      </Card>
      ))}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "10px 0"
        }}
      >
        <Pagination
          onChange={(page, pageSize) => {
            setcurrentPage(page);
            setAlertsPerPage(pageSize);
          }}
          current={currentPage}
          total={totalAlerts}
        />
      </div>
    </div>
  );
};

export default AlertViewer;
