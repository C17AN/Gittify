/*global chrome */

import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Notifications from "./components/Notifications/Notifications";

function App() {
  useEffect(() => {
    checkSignedIn();
  }, []);
  const [update, setUpdate] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const checkSignedIn = () => {
    alert("signing-in");
    chrome.storage.local.get(["token"], function (result) {
      result.token === null ? setSignedIn(false) : setSignedIn(true);
      alert(typeof result.token);
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

export default App;
