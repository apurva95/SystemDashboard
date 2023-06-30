import React, { useEffect, useState } from "react";
import { DashboardOutlined } from "@ant-design/icons";
import { Row, Col, Radio, Input, DatePicker, Card, Alert } from "antd";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import LoadingAnimation from "../assets/loading.json";
const { Search } = Input
const { RangePicker } = DatePicker;



const plainOptions = [
   {
      label: <>All</>,
      value: 'All'
   },
   {
   label: <>Information</>,
   value: 'Information'
},
{
   label: <>Warning</>,
   value: 'Warning'
},
{
   label: <>Error</>,
   value: 'Error'
},
{
   label: <>Debug</>,
   value: 'Debug'
},
{
   label: <>Critical</>,
   value: 'Critical'
},

];


const Logs = () => {
   const [appID, setappID] = useState("");
   const [logs, setLogs] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   const handleSearchLevel = async (/** @type {{ target: { value: any; }; }} */ e) => {
      debugger;
      try {
         const response = await fetch(`https://localhost:7135/api/search?uniqueId=${appID}&level=${e.target.value}`);;
         const logsData = await response.json();
         setLogs(logsData);
         setIsLoading(false)

      } catch (error) {
         console.error(error);
         setIsLoading(false)

      }
   };
   const handleSearch = async (e) => {
      try {
         debugger;
        const response = await fetch(`/api/searchLogs?searchTerm=${e}&uniqueId=${appID}`);;
        const logsData = await response.json();
        setLogs(logsData);
        setIsLoading(false)
      } catch (error) {
        console.error(error);
        setIsLoading(false)
      }
    };
    const onRangeChange =  async(dates, dateStrings) => {
      debugger;
      try {
         if (dates) {
        const response = await fetch(`/api/searchLogsTimeRange?uniqueId=${appID}&from=${dateStrings[0]}&to=${dateStrings[1]}`);;
        const logsData = await response.json();
        setLogs(logsData);
        setIsLoading(false)
         }
      } catch (error) {
        console.error(error);
        setIsLoading(false)
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
               target:{
                  value:"All"
               }
            })
         }
      }
   }, [appID]);
   return (
      <div>
         <div className="page-header">
            <DashboardOutlined /> Logs
         </div>
         <Row style={{
            padding: "10px",
            borderBottom: "1px solid #ccc"
         }}>
            <Col span={8}>
               <h3>Log Level</h3>
               <Radio.Group
               defaultValue={"All"}
               options={plainOptions} optionType="button"
                  // @ts-ignore
                  onChange={handleSearchLevel} />
            </Col>
            <Col span={8}>
               <h3>Time Range</h3>
               <RangePicker showTime onChange={onRangeChange}/>
            </Col>
            <Col span={8}>
               <h3>Search</h3>
               <Search placeholder="input search text" onSearch={value=>handleSearch(value)} enterButton />
            </Col>
         </Row>
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
            ) :
               logs.length > 0 ? (
                  logs.map((log) => (
                        <Alert message={log.message+""+log.type} type={log.level} hoverable/>
                  ))
               ) : (
                  <div>No data available</div>
               )}
         </div>
      </div>
   );
};


export default Logs;