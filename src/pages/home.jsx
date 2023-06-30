import { Skeleton } from "antd";
import { useEffect } from "react";
import AuthMiddleware from "../components/auth";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const history = useNavigate();
  useEffect(() => {
    setTimeout(()=>{
      history("/dashboard");
    },1000)
 }, []);

    return (
      <>
        <AuthMiddleware>
            <Skeleton loading={true} paragraph={{ rows: 2 }} />
        </AuthMiddleware>
      </>
    );
  }