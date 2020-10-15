/*global chrome */

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./App.css";
import Login from "./components/Login/Login";
import Notifications from "./components/Notifications/Notifications";

function App({ stateList }) {
  useEffect(() => {
    checkSignedIn();
  }, []);
  const [update, setUpdate] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  const checkSignedIn = () => {
    chrome.storage.local.get(["signIn"], function (result) {
      result.signIn === false ? setSignedIn(false) : setSignedIn(true);
    });
  };
  const onNewNotification = () => {
    setUpdate(!update);
    update
      ? chrome.browserAction.setIcon({ path: "logo_new.png" })
      : chrome.browserAction.setIcon({ path: "logo.png" });
  };
  return (
    <div className="App">
      <h1>Gittify</h1>
      {signedIn ? <Notifications /> : <Login />}
      <button onClick={onNewNotification}>Press this!</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    stateList: state,
  };
};

export default connect(mapStateToProps)(App);
