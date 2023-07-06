import React from "react";
import { Alert, Pagination } from "antd";
import { useEffect, useState } from "react";

const LogViewer = (props) => {
  debugger;
  const { logs } = props;
  const { searchTerm } = props;
  const [totalLogs, settotalLogs] = useState();
  const [currentPage, setcurrentPage] = useState(1);
  const [logsPerPage, setlogsPerPage] = useState(10);
  const [currentSets, setcurrentSets] = useState([]);

  useEffect(() => {
    settotalLogs(logs.length);
    setcurrentSets(logs.slice(0, logsPerPage));
  }, [logs]);

  useEffect(() => {
    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    setcurrentSets(logs.slice(indexOfFirstLog, indexOfLastLog));
  }, [currentPage, logsPerPage]);

  function highlightText(text, highlight) {
    debugger;
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
      {currentSets.map((log) => (
        <Alert message={highlightText((log.message + "" + log.type),searchTerm)} type={log.level} hoverable showIcon />
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
            setlogsPerPage(pageSize);
          }}
          current={currentPage}
          total={totalLogs}
        />
      </div>
    </div>
  );
};

export default LogViewer;
