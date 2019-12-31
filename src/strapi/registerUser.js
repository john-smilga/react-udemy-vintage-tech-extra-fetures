import axios from "axios";
import url from "../utils/URL";

async function registerUser({ email, password, username }) {
  const response = await axios
    .post(`${url}/auth/local/register`, {
      username,
      email,
      password
    })
    .catch(error => console.log(error));
  return response;
}

export default registerUser;
