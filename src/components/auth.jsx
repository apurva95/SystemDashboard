import React from "react";
import { useNavigate } from "react-router-dom";
import {useEffect,useState} from "react";
import { Skeleton } from "antd";

const AuthMiddleware = (props) => {
  const [canShow, setcanShow] = useState(false);
  const history = useNavigate();
  useEffect(() => {
    // get token_id from  local storage
    if (window && window.localStorage) {
      let token_id = window.localStorage.getItem("appID");
      if (token_id) {
        // redirect to dashboard
        setcanShow(true);
      } else {
        history("/login");
      }
    }
  }, []);

  return (
    <div>
      {canShow && props.children}
      {!canShow && (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      )}
    </div>
  );
};

export default AuthMiddleware;
