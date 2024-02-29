import axios from 'axios';
import { page_url, user_url } from '../../constants';

// Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const {data} = await axios.get(`${user_url}/profile`,{
      withCredentials:true
    });
    dispatch({
      type: "LoadUserSuccess",
      payload:data.user,
    });
  } catch (error) {
    dispatch({
      type: 'LoadUserFail',
      payload: error.response.data.message,
    });
  }
};


// Load creator
export const loadCreator = () =>async(dispatch) =>{
  try {
    dispatch({
      type: "LoadCreatorRequest",
    });
    const { data } = await axios.get(`${page_url}/page-profile`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadCreatorSuccess",
      payload: data.creator,
    });
  } catch (error) {
    dispatch({
      type: "LoadCreatorFail",
      payload: error.response.data.message,
    })
  }
}

// Update user information
export const updateUserInformation = (name, email, password) => async(dispatch) =>{
  try {
    dispatch({
      type: "updateUserInfoRequest",
    });

    const { data } = await axios.put(
      `${user_url}/user/update-user-info`,
      {
        email,
        password,
        phoneNumber,
        name,
      },
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Credentials": true,
        },
      }
    );

    dispatch({
      type: "updateUserInfoSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "updateUserInfoFailed",
      payload: error.response.data.message,
    });
  }
}

// get all users --- admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUsersRequest",
    });

    const { data } = await axios.get(`${server}/user/admin-all-users`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "getAllUsersFailed",
      payload: error.response.data.message,
    });
  }
};