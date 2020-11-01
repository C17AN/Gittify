import React from "react";
import "./Notification.css";
import { connect } from "react-redux";

function Notification({ title, type, date, url }) {
  return (
    <div className="Notification">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className={`Notification__container ${type}`}>
          <div className="Notification__title">{title}</div>
          <div className="Notification__secondLine">
            <div className="Notification__type">{type}</div>
            <div className="Notification__date">{date}</div>
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
