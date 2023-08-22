import React from "react";
import { Alert, Pagination, Select } from "antd";
import { useEffect, useState } from "react";
import { Button, Col, DatePicker, Input, Radio, Row, message, Dropdown, Menu } from "antd";
import { DownOutlined, FilePdfOutlined, FileExcelOutlined } from '@ant-design/icons';

const LogViewer = (props) => {
  const { logs } = props;
  const { searchFilter } = props;
  const { uniqueId } = props;
  const { type } = props;
  const { timeFilter } = props;
  const { searchTerm } = props;
  const [totalLogs, settotalLogs] = useState();
  const [currentPage, setcurrentPage] = useState(1);
  const [logsPerPage, setlogsPerPage] = useState(10);
  const [currentSets, setcurrentSets] = useState([]);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const { Option } = Select;
  const handlePageChange = (page) => {
    setcurrentPage(page);
  };
   // Function to handle elements per page change
   const handleElementsPerPageChange = (value) => {
    setcurrentPage(1); // Reset current page when elements per page changes
    setlogsPerPage(value);
  };
   // Calculate the start and end index of elements for the current page
   const startIndex = (currentPage - 1) * logsPerPage;
   const endIndex = startIndex + logsPerPage;
   // Get the elements to display for the current page
  const logsToDisplay = logs.slice(startIndex, endIndex);
  const handleDoc = async (docType) => {
    try {
      setLoadingPdf(true);
      const response = await fetch('https://logfetcher20230822191705.azurewebsites.net/api/doc?' + new URLSearchParams({
        searchTerm: searchTerm,
        uniqueId: uniqueId,
        type: type,
        fromDate: timeFilter[0]? timeFilter[0] : "",
        toDate: timeFilter[1] ? timeFilter[1] : "",
        docType: docType
}))
      if (!response.ok) {
        throw new Error("PDF generation failed");
      }

      // Generate the download URL for the PDF
      const downloadUrl = docType === 'pdf'?`https://loggerfiles.s3.eu-west-2.amazonaws.com/logFiles/${uniqueId}`+".pdf":`https://loggerfiles.s3.eu-west-2.amazonaws.com/logFiles/${uniqueId}`+".csv";

    // Create a link and trigger the download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.target = '_blank';  // Open the link in a new tab
    link.download = docType === 'pdf'? uniqueId.toString() + '.pdf':uniqueId.toString() + '.csv';  // provide the file name

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
      {logsToDisplay.map((log) => (
        <Alert message={highlightText((log.message + "" + log.type),searchTerm)} type={log.level} hoverable showIcon />
      ))}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "10px 0"
        }}
      >
         <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="pdf" onClick={() => handleDoc('pdf')}>
                  <FilePdfOutlined />
                  Export as PDF
                </Menu.Item>
                <Menu.Item key="csv" onClick={() => handleDoc('csv')}>
                  <FileExcelOutlined />
                  Export as CSV
                </Menu.Item>
              </Menu>
            }
          >
            <Button>
              Export 
              <DownOutlined />
            </Button>
          </Dropdown>
          <Select value={logsPerPage} onChange={handleElementsPerPageChange}>
        <Option value={10}>10</Option>
        <Option value={20}>20</Option>
        <Option value={50}>50</Option>
        <Option value={75}>75</Option>
        <Option value={100}>100</Option>
      </Select>
        <Pagination
          onChange={handlePageChange}
          current={currentPage}
          total={totalLogs}
          pageSize={logsPerPage}
        />
      </div>
    </div>
  );
};

export default LogViewer;
