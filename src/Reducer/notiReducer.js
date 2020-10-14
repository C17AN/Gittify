const initialState = [];

const notiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_NOTIFICATION":
      return [...action.payload];
    case "UPDATED":
      return [];
    default:
      return state;
  }
};

export default notiReducer;
