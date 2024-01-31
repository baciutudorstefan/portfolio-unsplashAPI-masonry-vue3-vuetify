import axios from "axios";
const host = import.meta.env.VITE_BASE_URL;
const baseUrl = `${host}`;

const authToken = localStorage.getItem("auth_token");

class Api {
  host = baseUrl;

  async doGet(url, params) {
    return await axios
      .get(baseUrl + url, params, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => err);
  }

  async doPost(url, params) {
    return await axios
      .post(baseUrl + url, params, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  async doPut(url, params) {
    return await axios
      .put(baseUrl + url, params, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  async doDelete(url, params) {
    return await this.$axios
      .delete(PREFIX + url, params, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  async doGetBlob(url, params) {
    return await axios
      .post(baseUrl + url, params, { responseType: "blob" })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  async doPostMultipart(url, params) {
    return await axios
      .post(baseUrl + url, params, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }
}

export default new Api();
