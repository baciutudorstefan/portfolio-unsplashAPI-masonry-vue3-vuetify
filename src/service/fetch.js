import Api from "@/utils/api.js";

const prefix = "/api";

class FetchServices {
  async getFetch() {
    const res = await Api.doGet(`${prefix}/`);
    console.debug("GET FETCH", res);
    return res;
  }
}

export default new FetchServices();
