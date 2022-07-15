import { FETCH_IMAGES, FETCH_SINGLE_IMAGE } from "../actionTypes.js";

const initialState = {
  image: [],
  singleImage: [],
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_IMAGES:
      return { ...state, image: action.payload };
    case FETCH_SINGLE_IMAGE:
      return { ...state, image: action.payload };
    default:
      return state;
  }
};

export default userReducer;
