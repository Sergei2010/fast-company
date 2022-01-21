import httpService from "./http.sevice"

const qualityEndPoint = "quality/"

const qualityService = {
	fetchAll: async () => {
		const { data } = await httpService.get(qualityEndPoint)
		return data
	},
}
export default qualityService
