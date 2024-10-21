import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuthenticated() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate, isAuthenticated]);

  return isAuthenticated;
}
