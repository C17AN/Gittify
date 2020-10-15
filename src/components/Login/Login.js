/*global chrome */

import React, { useState } from "react";
import { connect } from "react-redux";
import "./Login.css";

function Login({ stateList, submitKeyToReducer }) {
  const [token, setToken] = useState("");
  const [loading, isLoading] = useState(false);

  const handleChange = (e) => {
    submitKeyToReducer(e.target.value);
    chrome.storage.local.set({ token: e.target.value }, () => {});
  };

  // 최초 로그인 수행
  const handleLogin = () => {
    chrome.storage.local.get(["token"], function (result) {
      alert(result.token);
      fetch("https://api.github.com/notifications", {
        headers: {
          method: "GET",
          Authorization: `token ${result.token}`,
        },
      }).then((res) => {
        alert(res.status);
        if (res.status === 200) {
          chrome.storage.local.set({ signIn: true });
          alert("Login success");
        } else {
          alert("Invalid GH Token Detected.");
        }
      });
    });
  };

  return (
    <div className="Login">
      <div>Input GH Token</div>
      <input
        type="text"
        className="Login__input"
        placeholder="Input GH Token"
        onChange={(e) => handleChange(e)}
      ></input>
      <div className="Login__questions">
        <a href="https://github.com/C17AN/Gittify">What is GitHub Token?</a>
      </div>
      <div className="Login__questions">
        <a href="https://github.com/C17AN/Gittify">
          Why GitHub Token is Required?
        </a>
      </div>
      <button name="value" className="Login__btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { stateList: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitKeyToReducer: (token) => {
      dispatch({ type: "SUBMIT_GH_KEY", payload: token });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
