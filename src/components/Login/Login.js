import React, { useState } from "react";
import { connect } from "react-redux";
import "./Login.css";

function Login({ login, stateList }) {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div className="Login">
      <form>
        <div>GitHub Username</div>
        <input type="text" className="Login__input"></input>
        <div>Password</div>
        <input
          type={visible ? "text" : "password"}
          className="Login__input"
        ></input>
        <label htmlFor="visible" className="Login__PW__visiblity">
          Show Password
        </label>
        <input
          type="checkbox"
          name="visible"
          style={{ verticalAlign: "middle" }}
          onChange={() => toggleVisible()}
        />
        <button name="value" className="Login__btn" onClick={login}>
          Login
        </button>
        <div>{stateList}</div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { stateList: state };
};

export default connect(mapStateToProps)(Login);
