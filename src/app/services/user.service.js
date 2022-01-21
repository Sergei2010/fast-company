import httpService from "./http.sevice"

const userEndPoint = "user/"

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndPoint)
    return data
  },
}

export default userService
