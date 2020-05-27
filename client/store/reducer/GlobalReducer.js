const GlobalReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      return {
        ...state,
        auth: payload,
      }
    case "GET_MARKERS":
      return {
        ...state,
        markers: payload
      }
    default:
      return state;
  }
}

export default GlobalReducer;