//@ts-check
import React, { useEffect, useState } from "react";
import { DashboardOutlined } from "@ant-design/icons";
import VisualizationTab from "./VisualizationTab";

const Visualization = () => {
   const [appID, setappID] = useState("");
   useEffect(() => {
      // get token_id from  local storage
      if (window && window.sessionStorage) {
         let token_id = window.sessionStorage.getItem("appID");
         if (token_id) {
            // redirect to dashboard
            setappID(token_id);
         }
      }
   }, []);
   return (<div>
      <div className="page-header">
           <DashboardOutlined /> Visualization
      </div>
      {/* @ts-ignore */}
      <VisualizationTab uniqueId={appID} />
   </div>);
};


export default Visualization;