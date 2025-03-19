import "izitoast/dist/css/iziToast.min.css";
import {renderGallery, refreshLightbox} from './js/render-functions';
import {fetchPhotosByQuery} from './js/pixabay-api'
import iziToast from "izitoast";

const refs = {
    form: document.querySelector('form'),
    gallery: document.querySelector('.gallery'),
    loader: document.querySelector('.loader'),
    loadMore: document.querySelector('.load_btn'),
}
let page = 1;
let search = '';
let totalPages = 0;

const showLoader = () => {
    refs.loader.style.display = 'block';
};

const hideLoader = () => {
    refs.loader.style.display = 'none';
};
const onSearchFormSubmit = async (event) => {
    event.preventDefault();

    search = event.currentTarget.elements["search-text"].value.trim();
    page = 1; 

    if (search === '') {
        iziToast.warning({
            title: 'Warning',
            message: 'Input must contain letters!',
            position: 'topRight',
        });
        return;
    }

    refs.gallery.innerHTML = ''; 
    refs.loadMore.classList.add('is-hidden');

    showLoader();

    try {
        const { hits, totalHits } = await fetchPhotosByQuery(search, page);
        hideLoader(); 

        if (hits.length === 0) {
            iziToast.info({
                title: 'Info',
                message: 'No images found!',
                position: 'topRight',
                timeout: 5000,
            });
            refs.form.reset();
            return;
        }

        totalPages = Math.ceil(totalHits / 10); 
        renderGallery(refs.gallery, hits);
        refreshLightbox(); 

        if (page < totalPages) {
            refs.loadMore.classList.remove('is-hidden'); 
        }

    } catch (error) {
        console.error(error);
        hideLoader();
    } 
};

const onLoadMoreClick = async () => {
    page += 1;
    refs.loadMore.classList.add('is-hidden');
    showLoader();

    try {
        const { hits } = await fetchPhotosByQuery(search, page); 
        hideLoader();

        renderGallery(refs.gallery, hits);
        refreshLightbox(); 

        const itemHeight = refs.gallery.children[0].getBoundingClientRect().height;
        smoothScrollBy(itemHeight * 2, 1000);

        if (page >= totalPages) {
            iziToast.info({
                title: 'End of Results',
                message: 'We are sorry, but you have reached the end of search results',
                position: 'topRight',
                timeout: 5000,
            });
            refs.loadMore.classList.add('is-hidden');
        } else {
            refs.loadMore.classList.remove('is-hidden'); 
        }

    } catch (error) {
        console.error(error);
        hideLoader();
    } 
};
const smoothScrollBy = (targetScroll, duration) => {
    const start = window.scrollY;
    const startTime = performance.now();
  
    const animateScroll = currentTime => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
  
      const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
  
      const newPosition = start + targetScroll * easeOutCubic(progress);
      window.scrollTo(0, newPosition);
  
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };
  
    requestAnimationFrame(animateScroll);
  };
  
refs.form.addEventListener('submit', onSearchFormSubmit);
refs.loadMore.addEventListener('click', onLoadMoreClick);
