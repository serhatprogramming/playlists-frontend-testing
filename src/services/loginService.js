import axios from "axios";

const API_ENDPOINT = "/api/login";

const initiateLogin = async (userCredentials) => {
  const serverResponse = await axios.post(API_ENDPOINT, userCredentials);
  return serverResponse.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { initiateLogin };
