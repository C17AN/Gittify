const loginState = {
  signedIn: false,
  token: "",
};

const loginReducer = (state = loginState, action) => {
  switch (action.type) {
    case "SUBMIT_GH_KEY":
      return { ...loginState, token: action.payload };
    default:
      return state;
  }
};

export default loginReducer;
