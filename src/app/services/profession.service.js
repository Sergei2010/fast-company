import httpService from "./http.sevice"

const professionEndPoint = "profession/"

const professionService = {
  get: async () => {
    const { data } = await httpService.get(professionEndPoint)
    return data
  },
}

export default professionService
