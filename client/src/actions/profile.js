import axios from '../axios/axios';
import { setAlert } from './alert';
import { logout } from './auth';
import {
  GET_PROFILE,
  GET_PROFILES,
  GET_PROFILE_USER,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_GITHUB,
} from './types';

//TODO Get current user's profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//TODO Get all user profiles
export const getProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile');
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//TODO Get user's profile
export const getProfile = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${id}`);
    dispatch({
      type: GET_PROFILE_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//TODO Get Github Repos
export const getGithub = (username) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/profile/github/${username}`
    );
    dispatch({
      type: GET_GITHUB,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//TODO Create & Update profile
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify(formData);
      const res = await axios.post(
        '/api/profile',
        body,
        config
      );
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      dispatch(
        setAlert(
          edit ? 'Profile updated!' : 'Profile created!',
          'successStyle'
        )
      );
      if (!edit) {
        history.push('/dashboard');
      }
    } catch (err) {
      const errors = err.response.data.msg;
      if (errors) {
        errors.forEach((error) =>
          dispatch(setAlert(error.msg, 'dangerStyle'))
        );
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };

//TODO Add Experience
export const addExperience =
  (formData, history) => async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify(formData);
      const res = await axios.put(
        '/api/profile/experience',
        body,
        config
      );
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(
        setAlert('Experience added', 'successStyle')
      );
      history.push('/dashboard');
    } catch (err) {
      const errors = err.response.data.msg;
      if (errors) {
        errors.forEach((error) =>
          dispatch(setAlert(error.msg, 'dangerStyle'))
        );
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };

//TODO Add Education
export const addEducation =
  (formData, history) => async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify(formData);
      const res = await axios.put(
        '/api/profile/education',
        body,
        config
      );
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert('Education added', 'successStyle'));
      history.push('/dashboard');
    } catch (err) {
      const errors = err.response.data.msg;
      if (errors) {
        errors.forEach((error) =>
          dispatch(setAlert(error.msg, 'dangerStyle'))
        );
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };

//TODO Delete experience
export const deleteExperience =
  (id) => async (dispatch) => {
    try {
      const res = await axios.delete(
        `/api/profile/experience/${id}`
      );
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(
        setAlert('Experience deleted', 'successStyle')
      );
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };

//TODO Delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/api/profile/education/${id}`
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Education deleted', 'successStyle'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//TODO Delete account
export const deleteAccount =
  (history) => async (dispatch) => {
    try {
      await axios.delete(`/api/profile`);
      dispatch(logout());
      history.push('/');
      dispatch(setAlert('Account deleted', 'successStyle'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
