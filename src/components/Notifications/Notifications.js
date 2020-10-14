import { findAllByTitle } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Notification from "../Notification/Notification";
import "./Notifications.css";

function Notifications({ stateList = [], dispatchNotiList }) {
  useEffect(() => {
    checkNewNotification();
    setInterval(checkNewNotification, 60000);
  }, []);

  const [notiList, setNotiList] = useState([]);
  const [notiCount, setNotiCount] = useState(0);

  function checkNewNotification() {
    fetch("https://api.github.com/notifications", {
      headers: {
        method: "GET",
        // Authorization: `token ${stateList.Login}`,
        Authorization: `token 09e19603b0680ffcdaf11202f03f5a1e176931c1`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatchNotiList(
          data.filter((noti) => noti.reason !== "security_alert")
        );
        console.log(data);
        // data.forEach((noti) => {
        //   if (noti.reason !== "security_alert") {
        //     dispatchNotiList(noti);
        //   }
        // });
      });
  }
  console.log(stateList);
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
          id: id,
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
      <button>Sign Out (Remove Key From Storage)</button>
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);