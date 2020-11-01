/*global chrome */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Notification from "../Notification/Notification";
import "./Notifications.css";

function Notifications({ stateList = [], setSignOut, dispatchNotiList }) {
  // 10분마다 신규 노티 확인
  // useEffect(() => {
  //   checkNewNotification();
  //   setInterval(checkNewNotification, 60000);
  // }, []);
  // // 로그아웃 시, 로컬에 저장된 토큰 제거함.
  // const signOut = () => {
  //   setSignOut();
  //   chrome.storage.local.set({ token: null, signIn: false }, () => {
  //     alert("SuccessFully Removed GH Token.");
  //   });
  // };
  // // 노티 업데이트
  // function checkNewNotification() {
  //   fetch("https://api.github.com/notifications", {
  //     headers: {
  //       method: "GET",
  //       Authorization: `token ${stateList.Login.token}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       dispatchNotiList(
  //         data.filter((noti) => noti.reason !== "security_alert")
  //       );
  //     });
  // }
  return (
    <div className="Notifications">
      <div style={{ marginBottom: "8px" }}>
        {`You Have ${
          stateList.Noti.length > 9 ? "9+" : stateList.Noti.length
        } Unread Notifications.`}
      </div>
      <div className="Notifications__container">
        <Notification
          title={"sample title 1 sample title 1 sample title 1 sample title 1"}
          type={"mention"}
          date={"2020-10-13"}
        />

        <Notification
          title={"sample title 2"}
          type={"author"}
          date={"2020-10-13"}
        />

        <Notification
          title={"state_change"}
          type={"state_change"}
          date={"2020-10-13"}
        />

        <Notification title={"assign"} type={"assign"} date={"2020-10-13"} />
        <Notification
          title={"review_requested"}
          type={"review_requested"}
          date={"2020-10-13"}
        />
        <Notification
          title={"subscribed"}
          type={"subscribed"}
          date={"2020-10-13"}
        />
        <Notification
          title={"invitation"}
          type={"invitation"}
          date={"2020-10-13"}
        />
        <Notification
          title={"team_mention"}
          type={"team_mention"}
          date={"2020-10-13"}
        />
        <Notification title={"comment"} type={"comment"} date={"2020-10-13"} />
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
      <button className="Notifications__signout">
        {/* <button onClick={signOut} className="Notifications__signout"> */}
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
    setSignOut: () => {
      dispatch({ type: "LOGOUT" });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
