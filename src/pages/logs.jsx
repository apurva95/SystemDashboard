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
import React, { useEffect, useState, useMemo } from "react";
import LoadingAnimation from "../assets/logsLoader.json";
import LogViewer from "../components/logview";
// import { DownOutlined, FilePdfOutlined, FileExcelOutlined } from '@ant-design/icons';
// import { saveAs } from 'file-saver';
// import PdfMake from 'pdfmake/build/pdfmake';
// import PdfFonts from 'pdfmake/build/vfs_fonts';
// PdfMake.vfs = PdfFonts.pdfMake.vfs;
import {AgGridReact} from 'ag-grid-react';
import DTPicker from "../components/DTPicker";
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';

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
  const [gridApi, setGridApi] = useState([]);

  const handleSearchLevel = async (/** @type {{ target: { value: any; }; }} */ e) => {
    if (!appID) {
      return;
    }
    try {
      message.loading("Loading...");
      const response = await fetch(`https://localhost:7135/api/search?uniqueId=${appID}&level=${e.target.value}`);
      const logsData = await response.json();
              debugger;
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
      debugger;
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
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      sortable: true,
      filter: true,
      pagination: true,
      paginationPageSize: 10,
      animateRows:true,
      suppressAggFuncInHeader:true,
      domLayout:"autoHeight",
      wrapText: true,
      autoHeight: true,
      resizable:true,
      filterParams: {
        buttons: ['apply', 'clear', 'reset'],
      },
    };
  }, []);

  const resetAppliedFilters = () => {
    gridApi.setFilterModel(null);
  };

  const gridOptions = {
    columnDefs: [
      {headerName: "Timestamp", field: "timeStamp", filter: "agDateColumnFilter", flex: 1.2,
      filterParams: {
        defaultOption: "inRange",
        comparator: function(filterLocalDate, cellValue) {
          filterLocalDate = new Date(filterLocalDate)
          cellValue = new Date(cellValue)
          let filterBy = filterLocalDate.getTime();
          let filterMe = cellValue.getTime();
          debugger;
          if (filterBy === filterMe) {
            return 0;
          }

          if (filterMe < filterBy) {
            return -1;
          }

          if (filterMe > filterBy) {
            return 1;
          }
        }
      },valueFormatter: function (params) {
        // Format the date and time to "dd-mm-yyyy HH:mm:ss" format
        const date = new Date(params.value);
        const formattedDate = date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
        const formattedTime = date.toLocaleTimeString('en-US', {
          hour12: false,
        });
  
        return `${formattedDate} ${formattedTime}`;
      }},
      {headerName: "Level", field: "level",flex: 1},
      {headerName: "Calling File", field: "callingFile",flex: 3},
      {headerName: "Calling Method", field: "callingMethod",flex: 1},
      {headerName: "Message", field: "message",flex: 3}
    ],
    rowData: logs,
    defaultColDef:defaultColDef,
    onGridReady: (params) => {
      setGridApi(params.api);
      //params.api.sizeColumnsToFit();
    },
    rowClassRules: {
      "row-information": params => params.api.getValue("level", params.node) === 'Information',
      "row-error": params => params.api.getValue("level", params.node) === 'Error',
      "row-warning": params => params.api.getValue("level", params.node) === 'Warning',
      "row-critical": params => params.api.getValue("level", params.node) === 'Critical'
    }
  }

  // const handleExport = (type) => {
  //   try {
  //     switch (type) {
  //       case 'pdf':
  //         debugger;
  //         // Generate PDF
  //         const pdfContent = {
  //           content: [
  //             {
  //               table: {
  //                 headerRows: 1,
  //                 widths: ['auto', 'auto', 'auto', 'auto', '*'],
  //                 body: [
  //                   ['TimeStamp', 'Level', 'Calling File', 'Calling Method and Line', 'Message'],
  //                   ...logs.map(log => [
  //                     log.timeStamp || '',
  //                     log.level || '',
  //                     log.callingFile || '',
  //                     log.callingMethodAndLine || '',
  //                     log.message || ''
  //                   ])
  //                 ]
  //               }
  //             }
  //           ]
  //         };
  //         const pdfDoc = PdfMake.createPdf(pdfContent);
  //         pdfDoc.getBuffer((buffer) => {
  //           const pdfBlob = new Blob([buffer], { type: 'application/pdf' });
  //           debugger;
  //           saveAs(pdfBlob, 'logs.pdf');
  //         });
  //         break;

  //       case 'csv':
  //         // Generate CSV
  //         let csvContent = 'Index,TimeStamp,Level,Calling File,Calling Method and Line,Message\n';
  //         for (const log of logs) {
  //           const csvLine = `${log.index},"${log.timeStamp}","${log.level}","${log.callingFile}","${log.callingMethodAndLine}","${log.message}"\n`;
  //           csvContent += csvLine;
  //         }
  //         const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  //         saveAs(csvBlob, 'logs.csv');
  //         break;

  //       default:
  //         break;
  //     }
  //   }
  //   catch (error) {
  //     console.error('Error exporting logs:', error);
  //     message.error('Error exporting logs. Please try again.');
  //   }
  // };
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
          {/* <Button
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
            
          </Button> */}
          <Button onClick={resetAppliedFilters} variant="outlined">
        Reset Filters
      </Button>
          {/* <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="pdf" onClick={() => handleExport('pdf')}>
                  <FilePdfOutlined />
                  Export as PDF
                </Menu.Item>
                <Menu.Item key="csv" onClick={() => handleExport('csv')}>
                  <FileExcelOutlined />
                  Export as CSV
                </Menu.Item>
              </Menu>
            }
          >
            <Button>
              Export <DownOutlined />
            </Button>
          </Dropdown> */}
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
          <div
				className="ag-theme-alpine"
				 style={{ height: "76vh", width: "100%" }}
			>
				<AgGridReact components={{ agDateInput: DTPicker }}
                    gridOptions={gridOptions} rowSelection="multiple"
                    excel>
				</AgGridReact>
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
      </div>
    </div>
  );
};

export default Logs;
