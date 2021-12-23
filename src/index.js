import './sass/main.scss';
import { pixabayResult } from './gallery-items.js';

const galleryItems = pixabayResult.hits;
console.log(galleryItems)

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createGalleryCardMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryCardMarkup(galleryItems) {
  return galleryItems.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `
    <div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          <span>${likes}</span>
        </p>
        <p class="info-item">
          <b>Views</b>
          <span>${views}</span>
        </p>
        <p class="info-item">
          <b>Comments</b>
          <span>${comments}</span>
        </p>
        <p class="info-item">
          <b>Downloads</b>
          <span>${downloads}</span>
       </p>
      </div>
    </div>
  `
  })
    .join('');
}

function onGalleryCardClick(evt) {
  evt.preventDefault();

  const isGalleryCardEl = evt.target.classList.contains('gallery__image');
  if (!isGalleryCardEl) {
    return;
  }
  const bigPicture = evt.target.dataset.source;
  const instance = basicLightbox.create(`
      <img src="${bigPicture}" width="800" height="600">
  `)
  instance.show()
};


