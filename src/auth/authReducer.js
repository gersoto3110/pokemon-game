export const initAuth = {
  isLogged: false,
  error: null,
};

export const types = {
  isLogged: "IS_LOGGED",
  updateError: "UPDATE_REDUCER",
  logout: "LOGOUT",
};

export function authReducer(prevAuth, action) {
  switch (action.type) {
    case types.isLogged:
      return {
        ...prevAuth,
        isLogged: true,
        error: null,
      };
    case types.updateError:
      return {
        ...prevAuth,
        error: action.payload,
      };
    case types.logout:
      return {
        ...prevAuth,
        isLogged: false,
      }
    default:
      return prevAuth;
  }
}
