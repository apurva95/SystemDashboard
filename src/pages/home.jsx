import { Skeleton } from "antd";
import { useEffect } from "react";
import AuthMiddleware from "../components/auth";

export default function HomePage() {
    

    return (
      <>
        <AuthMiddleware>
            <div>Home Page</div>
        </AuthMiddleware>
      </>
    );
  }