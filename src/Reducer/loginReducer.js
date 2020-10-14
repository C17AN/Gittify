const loginState = {
  signedIn: false,
  token: "",
};

const loginReducer = (state = loginState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...loginState, token: action.payload };
    case "LOGOUT":
      return state;
    default:
      return state;
  }
};

export default loginReducer;
