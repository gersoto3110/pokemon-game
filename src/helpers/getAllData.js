import axios from "axios";

export default async function getAllData(urls) {
  try {
    const responses = await Promise.all(urls.map((url) => axios(url)));
    return responses.map((res) => res.data);

  } catch (error) {
    throw error;
  }
}
