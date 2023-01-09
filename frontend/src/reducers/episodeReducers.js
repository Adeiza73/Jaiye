import {
  EPISODE_LIST_REQUEST,
  EPISODE_LIST_SUCCESS,
  EPISODE_LIST_FAIL,
  EPISODE_DETAILS_REQUEST,
  EPISODE_DETAILS_SUCCESS,
  EPISODE_DETAILS_FAIL,
  EPISODE_DELETE_REQUEST,
  EPISODE_DELETE_SUCCESS,
  EPISODE_DELETE_FAIL,
  EPISODE_CREATE_RESET,
  EPISODE_CREATE_FAIL,
  EPISODE_CREATE_SUCCESS,
  EPISODE_CREATE_REQUEST,
  EPISODE_UPDATE_REQUEST,
  EPISODE_UPDATE_SUCCESS,
  EPISODE_UPDATE_FAIL,
  EPISODE_UPDATE_RESET,
  EPISODE_CREATE_REVIEW_REQUEST,
  EPISODE_CREATE_REVIEW_SUCCESS,
  EPISODE_CREATE_REVIEW_FAIL,
  EPISODE_CREATE_REVIEW_RESET,
  EPISODE_TOP_REQUEST,
  EPISODE_TOP_SUCCESS,
  EPISODE_TOP_FAIL,
} from '../constants/episodeConstants'

export const episodeListReducer = (state = { episodes: [] }, action) => {
  switch (action.type) {
    case  EPISODE_LIST_REQUEST:
      return { loading: true, episodes: [] }
    case EPISODE_LIST_SUCCESS:
      return {
        loading: false,
        episodes: action.payload.episodes,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case EPISODE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const episodeDetailsReducer = (
  state = { episode: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case EPISODE_DETAILS_REQUEST:
      return { ...state, loading: true }
    case EPISODE_DETAILS_SUCCESS:
      return { loading: false, episode: action.payload }
    case EPISODE_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const episodeDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EPISODE_DELETE_REQUEST:
      return { loading: true }
    case EPISODE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case EPISODE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const episodeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EPISODE_CREATE_REQUEST:
      return { loading: true }
    case EPISODE_CREATE_SUCCESS:
      return { loading: false, success: true, episode: action.payload }
    case EPISODE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case EPISODE_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const episodeUpdateReducer = (state = { episode: {} }, action) => {
  switch (action.type) {
    case EPISODE_UPDATE_REQUEST:
      return { loading: true }
    case EPISODE_UPDATE_SUCCESS:
      return { loading: false, success: true, episode: action.payload }
    case EPISODE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case EPISODE_UPDATE_RESET:
      return { episode: {} }
    default:
      return state
  }
}

export const episodeReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EPISODE_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case EPISODE_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case EPISODE_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case EPISODE_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const episodeTopRatedReducer = (state = { episodes: [] }, action) => {
  switch (action.type) {
    case  EPISODE_TOP_REQUEST:
      return { loading: true, episodes: [] }
    case EPISODE_TOP_SUCCESS:
      return { loading: false, episodes: action.payload }
    case EPISODE_TOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}