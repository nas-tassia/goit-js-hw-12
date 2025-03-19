import "izitoast/dist/css/iziToast.min.css";
import {createGalleryCard, lightbox} from './js/render-functions';
import {fetchPhotosByQuery} from './js/pixabay-api'
import iziToast from "izitoast";

const refs = {
    form: document.querySelector('form'),
    gallery: document.querySelector('.gallery'),
    loader: document.querySelector('.loader'),
}
const showLoader = () => {
    refs.loader.style.display = 'block';
};

const hideLoader = () => {
    refs.loader.style.display = 'none';
};
const onSearchFormSubmit = event =>{
    event.preventDefault();

    const search = event.currentTarget.elements["search-text"].value.trim();
    if (search === '') {
        iziToast.warning({
            title: 'Warning',
            message: 'Input must contain letters!',
            position: 'topRight',
        });
        return;
    }
    
    showLoader();

    fetchPhotosByQuery(search)
        .then(({hits}) => {
            if (hits.length === 0){
                iziToast.info({
                    title: 'Info',
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                    timeout: 5000, 
                });
            
                refs.form.reset();
                refs.gallery.innerHTML = ''; 
                return;
            
            }
            const galleryCard = hits.map(img => createGalleryCard(img)).join('');
            refs.gallery.innerHTML = galleryCard;

            lightbox();

        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            hideLoader();
        });
};

refs.form.addEventListener('submit', onSearchFormSubmit);
