import {
  CLEAR_PROFILE,
  CLEAR_PROFILE_USER,
  GET_PROFILE,
  GET_PROFILES,
  GET_PROFILE_USER,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_GITHUB,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  userProfile: null,
  loading: true,
  error: {},
  github: null,
};

export default function profile(
  state = initialState,
  action
) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: [...state.profiles, ...payload],
        loading: false,
      };
    case GET_PROFILE_USER:
      return {
        ...state,
        userProfile: payload,
        loading: false,
      };
    case CLEAR_PROFILE_USER:
      return {
        ...state,
        userProfile: null,
        github: null
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        profiles: [],
        userProfile: null,
        loading: true,
        error: {},
        github: null,
      };
    case GET_GITHUB:
      return {
        ...state,
        github: payload,
      };
    default:
      return state;
  }
}
