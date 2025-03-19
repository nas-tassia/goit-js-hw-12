import axios from 'axios';

// export const fetchPhotosByQuery = query =>{
//     return fetch(`https://pixabay.com/api/?key=49376861-d933ee90ccf66fe84851db78b&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`)
//             .then(response => {
//                 if (!response){
//                     throw new Error (response.status);
//                 }
//                 return response.json();
//             });
// }

const API_KEY = "49376861-d933ee90ccf66fe84851db78b";
const BASE_URL = "https://pixabay.com/api/";

export const fetchPhotosByQuery = async (query, page = 1, perPage = 10) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
                page,       
                per_page: perPage, 
            },
        });

        return response.data; 

    } catch (error) {
        console.error(error);
        throw error; 
    }
};
