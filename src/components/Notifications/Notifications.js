/*global chrome */
import { findAllByTitle } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Notification from "../Notification/Notification";
import "./Notifications.css";

function Notifications({ stateList = [], setSignOut, dispatchNotiList }) {
  useEffect(() => {
    checkNewNotification();
    setInterval(checkNewNotification, 5000000);
  }, []);
  const [mouseOver, setmouseOver] = useState(false);
  let cnt = 0;
  const signOut = () => {
    //setSignOut();
    chrome.storage.local.set({ token: null, signIn: false }, () => {
      alert("SuccessFully Removed GH Token.");
    });
  };

  const checkNewNotification = () => {
    chrome.storage.local.get(["token"], function (result) {
      chrome.browserAction.setIcon({ path: "logo_new.png" });
      //alert(cnt++);
      fetch("https://api.github.com/notifications", {
        headers: {
          method: "GET",
          Authorization: `token ${result.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatchNotiList(
            //data
            data.filter((noti) => noti.reason !== "security_alert")
          );
        });
    });
  };

  return (
    <div>
      <div style={{ marginBottom: "8px" }}>
        {`You Have ${
          stateList.Noti.length > 9 ? "9+" : stateList.Noti.length
        } Unread Notifications.`}
      </div>
      <div className="Notifications__container">
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
      </div>
      <span
        className={`Notifications__signout__warning ${
          mouseOver ? "focused" : ""
        }`}
      >
        Warning: By removing GH Key, You should request new key to reuse
        Gittify!
      </span>
      <button
        className="Notifications__signout"
        onMouseOver={() => setmouseOver(true)}
        onMouseLeave={() => setmouseOver(false)}
        onClick={signOut}
      >
        Sign Out (Remove Key From Storage)
      </button>
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
    // setSignOut: () => {
    //   dispatch({ type: "LOGOUT" });
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
