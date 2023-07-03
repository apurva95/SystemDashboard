import React from "react";
import { Alert, Pagination } from "antd";
import { useEffect, useState } from "react";

const LogViewer = (props) => {
  const { logs } = props;
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
    debugger;
  }, [currentPage, logsPerPage]);
  return (
    <div>
      {currentSets.map((log) => (
        <Alert message={log.message + "" + log.type} type={log.level} hoverable />
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
