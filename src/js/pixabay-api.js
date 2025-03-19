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
export const fetchPhotosByQuery = async (query) =>{
    try {
        const response = await axios.get(
            `https://pixabay.com/api/?key=49376861-d933ee90ccf66fe84851db78b&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
        );

        return response.data; 

    } catch (error) {
        console.error(error);
        throw error;
    }
}