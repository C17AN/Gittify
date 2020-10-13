/*global chrome */

import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Notifications from "./components/Notifications/Notifications";

function App() {
  const [update, setUpdate] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const onNewNotification = () => {
    setUpdate(!update);
    update
      ? chrome.browserAction.setIcon({ path: "logo_new.png" })
      : chrome.browserAction.setIcon({ path: "logo.png" });
  };
  const onLogin = () => {
    setSignedIn(true);
  };
  return (
    <div className="App">
      <h1>Gittify</h1>
      {signedIn ? <Notifications /> : <Login login={onLogin} />}
      <button onClick={onNewNotification}>Press this!</button>
    </div>
  );
}

export default App;
