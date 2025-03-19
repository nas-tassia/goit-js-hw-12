import "izitoast/dist/css/iziToast.min.css";
import {createGalleryCard, lightbox} from './js/render-functions';
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
const onSearchFormSubmit = event =>{
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

    fetchPhotosByQuery(search, page, 10) 
        .then(({hits, totalHits}) => {
            if (hits.length === 0){
                iziToast.info({
                    title: 'Info',
                    message: 'We are sorry, but you have reached the end of search results!',
                    position: 'topRight',
                    timeout: 5000, 
                });
            
                refs.form.reset();
                refs.gallery.innerHTML = ''; 
                return;
            
            }

            totalPages = Math.ceil(totalHits / 10);
            const galleryCard = hits.map(img => createGalleryCard(img)).join('');
            refs.gallery.innerHTML = galleryCard;

            lightbox();

            if (page < totalPages) {
                refs.loadMore.classList.remove('is-hidden');
            }

        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            hideLoader();
        });
};

const onLoadMoreClick = () => {
    page += 1; 
    showLoader();

    fetchPhotosByQuery(search, page, 10)
        .then(({ hits }) => {
            const galleryCard = hits.map(img => createGalleryCard(img)).join('');
            refs.gallery.insertAdjacentHTML('beforeend', galleryCard);
            const itemHeight = refs.gallery.children[0].getBoundingClientRect().height;
            smoothScrollBy(itemHeight * 2, 1000);
            lightbox(); 

            if (page >= totalPages) {
                refs.loadMore.classList.add('is-hidden');
            }
        })
        .catch(err => console.log(err))
        .finally(() => hideLoader());
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
