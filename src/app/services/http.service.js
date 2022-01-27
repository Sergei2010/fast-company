import axios from "axios"
import configFile from "../config.json"
import { toast } from "react-toastify"
import { httpAuth } from "../hooks/useAuth"
import localStorageService from "./localStorage.service"

// создаю новый экземпляр axios
const http = axios.create({
  baseURL: configFile.apiEndpoint,
})
// запрос к серверу
http.interceptors.request.use(
  async function (config) {
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url)
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + ".json"
      const expiresDate = localStorageService.getTokenExpiresDate()
      const refreshToken = localStorageService.getRefreshToken()
      if (refreshToken && expiresDate < Date.now()) {
        const { data } = await httpAuth.post("token", {
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        })
        // меняю названия переменных, т.к. получаю данные в другом фориате
        localStorageService.setTokens({
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          expiresIn: data.expires_in,
          localId: data.user_id,
        })
      }
      const accessToken = localStorageService.getAccessToken()
      if (accessToken) {
        config.params = { ...config.params, auth: accessToken }
      }
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
function transformData(data) {
  return data && !data._id
    ? Object.keys(data).map((key) => ({
        ...data[key],
      }))
    : data
}
// перехватываем ответ от сервера и выполняем трансформацию данных
http.interceptors.response.use(
  (res) => {
    if (configFile.isFireBase) {
      res.data = { content: transformData(res.data) }
    }
    return res
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500
    if (!expectedErrors) {
      toast.error("Something was wrong. Try it later")
    }
    return Promise.reject(error)
  }
)

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
}

export default httpService
