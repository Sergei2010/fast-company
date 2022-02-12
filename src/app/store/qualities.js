import { createSlice } from "@reduxjs/toolkit"
import qualityService from "../services/quality.service"
import isOutDated from "../utils/isOutDated"

const qualitiesSlice = createSlice({
  name: "qualities",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    // запрос
    qualitiesRequested: (state) => {
      state.isLoading = true
    },
    // обработка успешного результата
    qualitiesReceved: (state, action) => {
      state.entities = action.payload
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    // обработка неуспешного результата
    qualitiesRequestFiled: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

const { reducer: qualitiesReducer, actions } = qualitiesSlice

const { qualitiesRequested, qualitiesReceved, qualitiesRequestFiled } = actions

export const loadQualitiesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities
  // проверка актуальности данных (10 минут)
  if (isOutDated(lastFetch)) {
    console.log(lastFetch)
    dispatch(qualitiesRequested())
    try {
      const { content } = await qualityService.fetchAll()
      dispatch(qualitiesReceved(content))
    } catch (error) {
      dispatch(qualitiesRequestFiled(error.message))
    }
  }
}

export const getQualities = () => (state) => state.qualities.entities
export const getQualitiesLoadingStatus = () => (state) =>
  state.qualities.isLoading

export const getQualitiesByIds = (qualitiesIds) => (state) => {
  if (state.qualities.entities) {
    const qualitiesArray = []
    for (const qualId of qualitiesIds) {
      for (const quality of state.qualities.entities) {
        if (quality._id === qualId) {
          qualitiesArray.push(quality)
          break
        }
      }
    }
    return qualitiesArray
  }
  return []
}

export default qualitiesReducer
