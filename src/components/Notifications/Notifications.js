/*global chrome */
import { findAllByTitle } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Notification from "../Notification/Notification";
import "./Notifications.css";

function Notifications({ stateList = [], setSignOut, dispatchNotiList }) {
  useEffect(() => {
    checkNewNotification();
    setInterval(checkNewNotification, 60000);
  }, []);

  const signOut = () => {
    setSignOut();
    chrome.storage.local.set({ token: null, signIn: false }, () => {
      alert("SuccessFully Removed GH Token.");
    });
  };
  function checkNewNotification() {
    fetch("https://api.github.com/notifications", {
      headers: {
        method: "GET",
        Authorization: `token ${stateList.Login.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatchNotiList(
          data.filter((noti) => noti.reason !== "security_alert")
        );
      });
  }
  return (
    <div>
      <div style={{ marginBottom: "8px" }}>
        {`You Have ${
          stateList.Noti.length > 9 ? "9+" : stateList.Noti.length
        } Unread Notifications.`}
      </div>
      {stateList.Noti.map((el) => {
        const {
          subject,
          reason: type,
          updated_at: date,
          repository: repo,
          id,
        } = el;

        return (
          <Notification
            key={id}
            title={subject?.title}
            type={type}
            date={date}
            url={repo?.html_url}
          />
        );
      })}
      <button onClick={signOut}>Sign Out (Remove Key From Storage)</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { stateList: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchNotiList: (noti) => {
      dispatch({ type: "FETCH_NOTIFICATION", payload: noti });
    },
    setSignOut: () => {
      dispatch({ type: "LOGOUT" });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
