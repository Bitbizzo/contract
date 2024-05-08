// Import the API key
import axios from "axios";



const tmdbAcessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export const projectID = import.meta.env.VITE_PROJECT_ID;
export const clientKey = import.meta.env.VITE_CLIENT_KEY;
export const serverKey = import.meta.env.VITE_SERVER_KEY;
export const appID = import.meta.env.VITE_APP_ID;



export const imageBaseUrl = 'https://image.tmdb.org/t/p/original'

export const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${tmdbAcessToken}`, // Your TMDB API key
  },
});
