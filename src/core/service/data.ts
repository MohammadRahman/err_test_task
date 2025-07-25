import axios from "axios";

// const API_URL = import.meta.env.BASE_URL; // Replace with your actual API URL

function getApiData(){
    return axios.get("https://services.err.ee/api/v2/category/getByUrl?url=video&domain=jupiter.err.ee");
}

export const dataService = {
    getApiData
};

// element.style {
//     transition: opacity 0.1s ease 0s;
//     z-index: 2147483647;
//     margin: 0;
//     border-radius: 0;
//     padding: 0;
//     background: #939393 !important;
//     pointer-events: none;
//     position: fixed;
//     top: -10%;
//     right: -10%;
//     width: 120%;
//     height: 120%;
//     opacity: 0.6000;
//     mix-blend-mode: multiply;
//     display: block;
// }

// , 4 items,  1280px look into this image 