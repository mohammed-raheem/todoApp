import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // static user data
  const userData = {
    email: "m@gmail.com",
    password: "123",
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (email === userData.email && password === userData.password) {
      navigate("tasks");
      localStorage.setItem("isAuthenticated", "true");
    } else {
      alert("Login failed! Please check your email and password.");
    }
  }

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      navigate("tasks");
    }
  }, [navigate]);

  return (
    <div className={styles.login}>
      <div className={styles.loginBox}>
        <div className={styles.header}>
          <h1 className={styles.title}>Login</h1>
          <p className={styles.subTitle}>
            Login to your account to access your tasks
          </p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Passowrd"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.submit} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
