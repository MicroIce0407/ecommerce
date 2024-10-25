import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
      if (!token || !userId) {
        navigate("/Authform");
      }
    }, [navigate, token, userId]);

    if (!token || !userId) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
