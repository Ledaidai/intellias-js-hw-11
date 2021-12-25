import './sass/main.scss';

const axios = require('axios');
axios.get('https://pixabay.com/api/', {
   params:{
    key: '24932126-e4a09320761fab059b52dba3b',
    per_page: 40,
    page: 1
    }
  })
  .then(function (response) {
    // handle success
    const galleryItems = response.data.hits;
    const galleryMarkup = createGalleryCardMarkup(galleryItems);
    const galleryContainer = document.querySelector('.gallery');
    galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

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


