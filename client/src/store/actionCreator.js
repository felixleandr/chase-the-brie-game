// const url = "https://confirmed-antique-boysenberry.glitch.me";
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
      console.log(responseJSON);
      if (!response.ok) throw responseJSON.message;
      // localStorage.setItem("access_token", responseJSON.access_token);
      // localStorage.setItem('user', responseJSON.newUser.username)
      // localStorage.setItem('_id', responseJSON.newUser._id)
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
          'API-Key': 'secret',
          "Access-Control-Expose-Headers": "Content-Encoding,API-Key"
        },
        body: JSON.stringify(data),
      });

      const responseJSON = await response.json();

      if (!response.ok) throw responseJSON.message;
      localStorage.setItem("access_token", responseJSON.access_token);
      localStorage.setItem('user', responseJSON.user.username)
      localStorage.setItem('_id', responseJSON.user._id)
      return dispatch({ type: "login_success", payload: responseJSON });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export function fetchAllUsers(){
    return async (dispatch, getState) => {
        try {
            const response = await fetch(`${url}/users`, {
                method: "get",
                headers: {
                  "Content-Type": "application/json",
                  access_token: localStorage.access_token
                }
              });

              const resData = await response.json();
            if(!response.ok) {
                throw resData;
            }
            return dispatch({type: "user_fetch_success" , payload: resData})
        } catch (error) {
            throw error;
        }
    }
}

export function fetchUserById(){
    return async (dispatch, getState) => {
        try {
            const _id = localStorage._id
            const response = await fetch(`${url}/users/${_id}`, {
                method: "get",
                headers: {
                  "Content-Type": "application/json",
                  access_token: localStorage.access_token
                }
              });

              const resData = await response.json();
            if(!response.ok) {
                throw resData;
            }
            return dispatch({type: "userById_fetch_success" , payload: resData})
        } catch (error) {
            throw error;
        }
    }
}

export function incrementWins(gameType){
    return async(dispatch, getState) => {
        try {
            console.log(gameType);
            console.log('masuk');
            const _id = localStorage._id
            const response = await fetch(`${url}/users/${_id}`, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    access_token: localStorage.access_token
                },
                body: JSON.stringify(gameType)
            })
            const resData = await response.json();
            if(!response.ok){
                throw resData
            }
            await dispatch(fetchUserById())
            return resData
        } catch (error) {
            throw error
        }
    }
}

