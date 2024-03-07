import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleFormSubmit = async () => {
    try {
      const response = await fetch("http://localhost:4000/" + (isLogin ? "login" : "signup"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      } else {
        alert("Existing user found " + responseData.errors)
        console.log("Login/signup failed:", responseData.message);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        {isLogin ? (
          <>
            <h1>Login</h1>
            <div className="loginsignup-fields">
              <input
                type="email"
                placeholder="Your Email Address"
                name="email"
                value={formData.email}
                onChange={changeHandler}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={changeHandler}
              />
            </div>
          </>
        ) : (
          <>
            <h1>Sign Up</h1>
            <div className="loginsignup-fields">
              <input
                type="text"
                placeholder="Your Name"
                name="username"
                value={formData.username}
                onChange={changeHandler}
              />
              <input
                type="email"
                placeholder="Your Email Address"
                name="email"
                value={formData.email}
                onChange={changeHandler}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={changeHandler}
              />
            </div>
          </>
        )}
        <button onClick={handleFormSubmit}>{isLogin ? "Login" : "Sign Up"}</button>
        <p className="loginsignup-login" onClick={toggleForm}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span>{isLogin ? "Sign Up" : "Login"}</span>
        </p>
        {isLogin && (
          <div className="loginsignup-agree">
            <input type="checkbox" name="" id="" />
            <p>Remember me</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
