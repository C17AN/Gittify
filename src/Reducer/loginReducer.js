const loginState = {
  signedIn: false,
  token: "",
};

const loginReducer = (state = loginState, action) => {
  switch (action.type) {
    case "SUBMIT_GH_KEY":
      return { ...loginState, token: action.payload };
    case "LOGIN_SUCCESS":
      return { ...loginState, signedIn: true };
    case "LOGOUT":
      return { signedIn: false, token: null };
    default:
      return state;
  }
};

export default loginReducer;
