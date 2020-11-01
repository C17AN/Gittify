import React from "react";
import "./Notification.css";
import { connect } from "react-redux";

function Notification({ title, type, date, url }) {
  const parseDate = (date) => {
    const fullDate = date.split("T")[0];
    const fullTime = date.split("T")[1];
    let month = +fullDate.split("-")[1];
    const day = fullDate.split("-")[2];
    const time = fullTime.split(":")[0];
    const minute = fullTime.split(":")[1];

    switch (month) {
      case 1:
        month = "Jan";
        break;
      case 2:
        month = "Feb";
        break;
      case 3:
        month = "Mar";
        break;
      case 4:
        month = "Apr";
        break;
      case 5:
        month = "May";
        break;
      case 6:
        month = "Jun";
        break;
      case 7:
        month = "Jul";
        break;
      case 8:
        month = "Aug";
        break;
      case 9:
        month = "Sep";
        break;
      case 10:
        month = "Oct";
        break;
      case 11:
        month = "Nov";
        break;
      case 12:
        month = "Dec";
        break;
      default:
        return;
    }
    return `${month} ${day}, ${time}:${minute}`;
  };

  const parseType = (type) => {
    switch (type) {
      case "author":
        return "thread updated";
      case "manual":
        return "subscribe updated";
      case "security_alert":
        return "security alert";
      case "state_change":
        return "state changed";
      case "team_mention":
        return "team mention";
      case "review_requested":
        return "review requested";
      default:
        return type;
    }
  };

  return (
    <div className={`Notification`}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className={`Notification__container ${type}`}>
          <div className="Notification__title">{title}</div>
          <div className="Notification__secondLine">
            <div className="Notification__type">{parseType(type)}</div>
            <div className="Notification__date">{parseDate(date)}</div>
          </div>
        </div>
      </a>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    Notifications: state.Noti,
  };
};

export default connect()(Notification);
