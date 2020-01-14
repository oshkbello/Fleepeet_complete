const initalState = {
  loading: false
};
export const Loader = (state = initalState, action) => {
  switch (action.type) {
    case "Response-Loader":
      return {
        ...state,
        loading: action.data
      };
    default:
      return state;
  }
};
