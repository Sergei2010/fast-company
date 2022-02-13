import { createSlice } from "@reduxjs/toolkit"
import professionService from "../services/profession.service"
import isOutDated from "../utils/isOutDated"

const professionsSlice = createSlice({
  name: "professions",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    // запрос
    professionsRequested: (state) => {
      state.isLoading = true
    },
    // обработка успешного результата
    professionsReceved: (state, action) => {
      state.entities = action.payload
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    // обработка неуспешного результата
    professionsRequestFiled: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

const { reducer: professionsReducer, actions } = professionsSlice

const { professionsRequested, professionsReceved, professionsRequestFiled } =
  actions

export const loadProfessionsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().professions
  // проверка актуальности данных (10 минут)
  if (isOutDated(lastFetch)) {
    dispatch(professionsRequested())
    try {
      const { content } = await professionService.get()
      dispatch(professionsReceved(content))
    } catch (error) {
      dispatch(professionsRequestFiled(error.message))
    }
  }
}

export const getProfessions = () => (state) => state.professions.entities
export const getProfessionsLoadingStatus = () => (state) =>
  state.professions.isLoading
export const getProfessionById = (id) => (state) => {
  if (state.professions.entities) {
    return state.professions.entities.find((p) => p._id === id)
  }
}
export default professionsReducer
