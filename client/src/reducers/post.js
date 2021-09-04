import {
  ADD_POST,
  GET_POSTS,
  POST_ERROR,
  DELETE_POST,
  GET_POST,
  LIKE_POST,
  UNLIKE_POST,
  CLEAR_POST,
  ADD_COMMENT,
  DELETE_COMMENT
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function post(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((p) => p._id !== payload),
      };
    case CLEAR_POST: {
      return {
        ...state,
        post: null,
      };
    }
    case LIKE_POST:
    case UNLIKE_POST:
      const postIndex = state.posts.findIndex(
        (p) => p._id === payload.id
      );
      const postsCopy = [...state.posts];
      postsCopy[postIndex] = {
        ...state.posts[postIndex],
        likes: payload.likes,
      };
      return {
        ...state,
        posts: postsCopy,
      };
    case ADD_COMMENT:
    case DELETE_COMMENT:
      return {
        ...state,
        post: payload,
      };
    default:
      return state;
  }
}
