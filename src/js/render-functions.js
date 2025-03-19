import SimpleLightbox from 'simplelightbox';
export const createGalleryCard = imgInfo =>{
    return `
    <li class="gallery_card">
        <a class="gallery-link" href="${imgInfo.largeImageURL}">
            <img class="gallery_img" src="${imgInfo.webformatURL}" alt="${imgInfo.tags}"/>
        </a>
        <div class="img_info">
                <div class="info-item">
                    <p class="label">Likes</p>
                    <p class="value">${imgInfo.likes}</p>
                </div>
                <div class="info-item">
                    <p class="label">Views</p>
                    <p class="value">${imgInfo.views}</p>
                </div>
                <div class="info-item">
                    <p class="label">Comments</p>
                    <p class="value">${imgInfo.comments}</p>
                </div>
                <div class="info-item">
                    <p class="label">Downloads</p>
                    <p class="value">${imgInfo.downloads}</p>
                </div>
        </div>
    </li>
    `;
}

export const lightbox = () => {
    const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});
lightbox.refresh();
};