import request from "./config/axios.config";

export default class Episode {
  static getByIds(ids: number[]) {
    return request({
      url: `/episode/${ids}`,
      method: "GET",
    });
  }
}
