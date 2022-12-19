import request from "./config/axios.config";

export default class Location {
  static getById(id: number) {
    return request({
      url: `/location/${id}`,
      method: "GET",
    });
  }
}
