import axios from 'axios'
import {
  EPISODE_LIST_REQUEST,
  EPISODE_LIST_SUCCESS,
  EPISODE_LIST_FAIL,
  EPISODE_DETAILS_REQUEST,
  EPISODE_DETAILS_SUCCESS,
  EPISODE_DETAILS_FAIL,
  EPISODE_DELETE_SUCCESS,
  EPISODE_DELETE_REQUEST,
  EPISODE_DELETE_FAIL,
  EPISODE_CREATE_REQUEST,
  EPISODE_CREATE_SUCCESS,
  EPISODE_CREATE_FAIL,
  EPISODE_UPDATE_REQUEST,
  EPISODE_UPDATE_SUCCESS,
  EPISODE_UPDATE_FAIL,
  EPISODE_CREATE_REVIEW_REQUEST,
  EPISODE_CREATE_REVIEW_SUCCESS,
  EPISODE_CREATE_REVIEW_FAIL,
  EPISODE_TOP_REQUEST,
  EPISODE_TOP_SUCCESS,
  EPISODE_TOP_FAIL,
} from '../constants/episodeConstants'
import { logout } from './userActions'

export const listEpisodes = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: EPISODE_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/episodes?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: EPISODE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: EPISODE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listEpisodeDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: EPISODE_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/episodes/${id}`)

    dispatch({
      type: EPISODE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: EPISODE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteEpisode= (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EPISODE_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/episodes/${id}`, config)

    dispatch({
      type: EPISODE_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: EPISODE_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createEpisode = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: EPISODE_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/episodes`, {}, config)

    dispatch({
      type: EPISODE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: EPISODE_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateEpisode = (episode) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EPISODE_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/episodes/${episode._id}`,
      episode,
      config
    )

    dispatch({
      type: EPISODE_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: EPISODE_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: EPISODE_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const createEpisodeReview = (episodeId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: EPISODE_CREATE_REVIEW_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/episodes/${episodeId}/reviews`, review, config)

    dispatch({
      type: EPISODE_CREATE_REVIEW_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: EPISODE_CREATE_REVIEW_FAIL,
      payload: message,
    })
  }
}

export const listTopEpisodes = () => async (dispatch) => {
  try {
    dispatch({ type: EPISODE_TOP_REQUEST })

    const { data } = await axios.get(`/api/episodes/top`)

    dispatch({
      type: EPISODE_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: EPISODE_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}