const { default: axios } = require("axios");

class HttpRequest {
  static async get(endpoint, payload, token) {
    try {
      console.log(`${process.env.NEXT_PUBLIC_API}/${endpoint} in GET Request`);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/${endpoint}`,
        {
          params: {
            ...payload,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (e) {
      console.error(e);
      return e.response.data;
    }
  }

  static async post(endpoint, payload) {
    try {
      console.log(`${process.env.NEXT_PUBLIC_API}/${endpoint} in POST Request`);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/${endpoint}`,
        {
          ...payload,
        },
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
}

export default HttpRequest;
