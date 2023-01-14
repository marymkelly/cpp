import React from "react";

const loginResult = () => {
  return (
    <div className="login-result hide">
      <h1 className="login-result-title">Checking Authentication...</h1>
      <p className="login-result-message">This should only take a moment</p>
      <button onClick={() => {
            document.querySelector(".login-result").classList.add("hide")
      }}>
        Close
      </button>
    </div>
  );
};

export default loginResult;
