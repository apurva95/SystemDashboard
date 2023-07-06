// import { Button, message, Space, Table} from "antd";
// import { DeleteOutlined,EditOutlined,FilePdfOutlined} from '@ant-design/icons';
// import { useReactToPrint } from 'react-to-print';
// import {CSVLink} from "react-csv"
// import React, { useRef } from "react"
// interface Iprops{
// }
// const PrintList:React.FC=(props)=>{
//   const { logs } = props;
//   debugger;
// // const myList=[
// //     {"category":"credit","amount":200},
// //     {"category":"debit","amount":100},
// //     {"category":"debit","amount":100},
// //   ]
//   const componentRef = useRef<any>();
//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//   });
//  const columns = [
//         {
//             title: 'Message',
//             dataIndex: 'message',
//             key: 'message',
//           },
          
//         {
//           title: 'TimeStamp',
//           dataIndex: 'timeStamp',
//           key: 'timeStamp',
    
//         }
//        ]
//     return(
//       <div style={{width:"100%"}} >
//         <Space style={{float:"right"}}>
//           <Button type="primary">
//         <CSVLink
//               filename={"Expense_Table.csv"}
//               data={logs}
//               className="btn btn-primary"
//               onClick={()=>{
//                 message.success("The file is downloading")
//               }}
//             >
//               Export to CSV
//             </CSVLink> 
//             </Button>
//         <Button onClick={handlePrint} type="primary" danger><FilePdfOutlined /> Export to PDF </Button>
//         </Space>
//         <div ref={componentRef}>
//         {/* {logs && 
//         <Table  defaultExpandAllRows={true} columns={columns} dataSource={logs} />
//         } */}
//         </div>
//         </div>
//     )
// }
// export default PrintList;