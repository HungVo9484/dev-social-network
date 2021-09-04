import axios from '../axios/axios';
import { setAlert } from './alert';
import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_COMMENT,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  LIKE_POST,
  POST_ERROR,
  UNLIKE_POST,
} from './types';

//TODO Get all posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//TODO Add a post
export const addPost = (text) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ text });
  try {
    const res = await axios.post(
      '/api/posts',
      body,
      config
    );
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert('Post added', 'successStyle'));
  } catch (err) {
    const errors = err.response.data.msg;
    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'dangerStyle'))
      );
    }
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//TODO Remove a post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlert('Post deleted', 'successStyle'));
  } catch (err) {
    const error = err.response.data.msg;
    if (error) {
      dispatch(setAlert(error, 'dangerStyle'));
    }
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//TODO Get a post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data.msg;
    if (error) {
      dispatch(setAlert(error, 'dangerStyle'));
    }
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//TODO Like a post
export const likePost = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    dispatch({
      type: LIKE_POST,
      payload: {
        id: id,
        likes: res.data,
      },
    });
  } catch (err) {
    const error = err.response.data.msg;
    if (error) {
      dispatch(setAlert(error, 'dangerStyle'));
    }
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//TODO UNlike a post
export const unlikePost = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);
    dispatch({
      type: UNLIKE_POST,
      payload: {
        id: id,
        likes: res.data,
      },
    });
  } catch (err) {
    const error = err.response.data.msg;
    if (error) {
      dispatch(setAlert(error, 'dangerStyle'));
    }
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//TODO Add a comment
export const addComment =
  (postId, text) => async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify({ text });
      const res = await axios.post(
        `/api/posts/comment/${postId}`,
        body,
        config
      );
      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      });
      dispatch(setAlert('Comment added', 'successStyle'));
    } catch (err) {
      const errors = err.response.data.msg;
      if (errors) {
        errors.forEach((error) =>
          dispatch(setAlert(error.msg, 'dangerStyle'))
        );
      }
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };

//TODO Delete a comment
export const deleteComment =
  (postId, commentId) => async (dispatch) => {
    try {
      const res = await axios.delete(
        `/api/posts/comment/${postId}/${commentId}`
      );
      dispatch({
        type: DELETE_COMMENT,
        payload: res.data,
      });
      dispatch(setAlert('Comment deleted', 'successStyle'));
    } catch (err) {
      const error = err.response.data.msg;
      if (error) {
        dispatch(setAlert(error, 'dangerStyle'));
      }
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
