import { createStore } from "redux";

const reducer = (state = [], action) => {
  return ["사슴", "다람쥐"];
};

const store = createStore(reducer);

export default store;
