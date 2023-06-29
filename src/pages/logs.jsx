//@ts-check
import React from "react";
import {  DashboardOutlined } from "@ant-design/icons";
import { Row, Col,Radio, Input,DatePicker, Divider } from "antd";

const { RangePicker } = DatePicker;


const plainOptions = [{
   label:<>Information</>,
   value:'infomation'
},
{
   label:<>Warning</>,
   value:'warning'
},
{
   label:<>Error</>,
   value:'error'
},
{
   label:<>Debug</>,
   value:'debug'
},
{
   label:<>Critical</>,
   value:'critical'
},

];


const Logs = () => {
   return (<div>
      <div className="page-header">
           <DashboardOutlined /> Logs
      </div>
      <Row style={{
         padding: "10px",
         borderBottom: "1px solid #ccc"
      }}>
        <Col span={8}>
         <h3>Log Level</h3>
          <Radio.Group options={plainOptions} optionType="button" onChange={e=>console.log(e)} />
        </Col>
        <Col span={8}>
         <h3>Time Range</h3>
         <RangePicker  showTime />
        </Col>
        <Col span={8}>
         <h3>Search</h3>
         <Input.Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
        </Col>
      </Row>
   </div>);
};


export default Logs;