import axios from "axios";

// const API_URL = import.meta.env.BASE_URL; // Replace with your actual API URL

function getApiData(){
    return axios.get("https://services.err.ee/api/v2/category/getByUrl?url=video&domain=jupiter.err.ee");
}

export const dataService = {
    getApiData
};