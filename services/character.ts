import request from "./config/axios.config";

export default class Character {
  static get(queryString?: string) {
    return request({
      url: `/character${queryString}`,
      method: "GET",
    });
  }
  static getById(id: number) {
    return request({
      url: `/character/${id}`,
      method: "GET",
    });
  }
  static getByIds(ids: number[]) {
    return request({
      url: `/character/${ids.toString()}`,
      method: "GET",
    });
  }
}
