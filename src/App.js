/*global chrome */

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./App.css";
import Login from "./components/Login/Login";
import Notifications from "./components/Notifications/Notifications";

function App({ stateList }) {
  useEffect(() => {
    checkSignedIn();
    chrome.browserAction.setIcon({ path: "logo_new.png" });
    return () => {
      chrome.browserAction.setIcon({ path: "logo.png" });
    };
  }, [stateList.Login.signedIn]);

  const [update, setUpdate] = useState(false);
  const [signedIn, setSignedIn] = useState(true);

  const checkSignedIn = () => {
    chrome.storage.sync.get(["signIn"], function (result) {
      result.signIn === true || stateList.Login.signedIn === true
        ? setSignedIn(true)
        : setSignedIn(false);
    });
  };

  // const onNewNotification = () => {
  //   setUpdate(!update);
  //   update
  //     ? chrome.browserAction.setIcon({ path: "logo_new.png" })
  //     : chrome.browserAction.setIcon({ path: "logo.png" });
  // };
  return (
    <div className="App">
      <h1>Gittify</h1>
      {signedIn ? <Notifications /> : <Login />}
      {/* <button onClick={onNewNotification}>Press this!</button> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    stateList: state,
  };
};

export default connect(mapStateToProps)(App);
