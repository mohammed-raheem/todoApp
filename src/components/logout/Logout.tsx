import { useNavigate } from "react-router-dom";
import styles from "./logout.module.css";

const Logout = () => {
  const navigation = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigation("/");
  };

  return (
    <button className={styles.btn} onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
