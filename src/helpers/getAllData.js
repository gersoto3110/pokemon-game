import axios from "axios";

export default function getAllData(urls) {
  return Promise.all(urls.map((url) => axios(url)))
    .then(axios.spread((...responses) => responses.map((res) => res.data)))
    .catch((error) => error);
}
