import axios from "axios";

export const baseURL = axios.create({
  baseURL: `https://62646b1ba55d5055be4878c7.mockapi.io/people`
});


export async function getPeople() {
  try {
    const response = await baseURL.get();
    console.log("people", response.data);

    return response.data;
  } catch (error) {
    return error;
  }
}
