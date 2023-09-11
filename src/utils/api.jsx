import axios from 'axios';

const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjZkY2FjYTY2ZjNjOWE2ZWM1OTg1N2VhNjRmOTJjNSIsInN1YiI6IjYzZDdkNjI2MTJiMTBlMDA4NTFjZDdkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.stU-jWWcoOQ62IF4hiuQy7C-sfIxm7t5aYuYEcovuqc";

const headers = {
    Authorization: "bearer " + TMDB_TOKEN
};


export const fetchDataFromApi = async(url,params)=>{
    try {
        const {data} = await axios.get(BASE_URL + url,{
            headers,
            params
        })
        return data;
    } catch (error) {
        console.log(error)
        return error;
    }

}