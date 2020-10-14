/*global chrome */

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./Login.css";

function Login({ login, stateList, submitGitHubKey }) {
  // useEffect(() => {
  //   chrome.storage.local.get(["token"], function (result) {
  //     console.log("Your token is " + result.key);
  //     login();
  //     submitGitHubKey(token);
  //   });
  // }, []);
  const [token, setToken] = useState("");
  console.log(stateList);
  const handleChange = (e) => {
    setToken(e.target.value);
  };

  // 최초 로그인 수행
  const handleLogin = () => {
    login();
    submitGitHubKey(token);
    chrome.storage.local.set({ token: token }, () => {
      console.log("Token is set to ", token);
    });
  };

  return (
    <div className="Login">
      <form>
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
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { stateList: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitGitHubKey: (token) => {
      dispatch({ type: "SUBMIT_GH_KEY", payload: token });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
