import {
  LOGIN,
  LOGOUT,
  SIGNUP,
  JOBS,
  ADDFAVORITES,
  REMOVEFAVORITES,
  ALLJOBS,
  FCMTOKEN,
} from '../types/index';

export const signin = payload => {
  return {
    type: LOGIN,
    payload: payload,
  };
};
export const logout = () => {
  return {
    type: LOGOUT,
    payload: {uid: ''},
  };
};
export const signup = payload => {
  return {
    type: SIGNUP,
    payload: payload,
  };
};
export const addFavorites = payload => dispatch => {
  dispatch({
    // return {
    type: ADDFAVORITES,
    payload: payload,
  });
  // }
};
export const removeFavorites = payload => dispatch => {
  dispatch({
    // return {
    type: REMOVEFAVORITES,
    payload: payload,
  });
  // }
};
export const jobs_available = payload => {
  return {
    type: JOBS,
    payload: payload,
  };
};
export const all_jobs = payload => {
  return {
    type: ALLJOBS,
    payload: payload,
  };
};

export const fcm_token = payload => {
  return {
    type: FCMTOKEN,
    payload: payload,
  };
};
