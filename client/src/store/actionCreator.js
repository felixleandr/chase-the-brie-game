const url = "http://localhost:3000";

export function register(data) {
  return async (dispatch, getState) => {
    try {
      console.log(data);
      const response = await fetch(`${url}/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseJSON = await response.json();
      if (!response.ok) throw responseJSON.message;
      return dispatch({ type: "register_success", payload: responseJSON });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export function login(data) {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${url}/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseJSON = await response.json();
      console.log(responseJSON);
      if (!response.ok) throw responseJSON.message;
      localStorage.setItem("access_token", responseJSON.access_token);
      return dispatch({ type: "login_success", payload: responseJSON });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

