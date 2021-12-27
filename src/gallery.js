import Notiflix from 'notiflix';
const axios = require('axios');

export class Gallery {
  static URL = 'https://pixabay.com/api/';
  static KEY = '24932126-e4a09320761fab059b52dba3b';
  static PER_PAGE = 40;

  constructor(galleryElement, loadMoreElement) {
    this.page = 1;
    this.hitsCount = 0;
    this.searchTerm = '';
    this.galleryContainer = document.querySelector(galleryElement);
    this.loadMoreButton = document.querySelector(loadMoreElement);

    this.loadMoreButton.addEventListener('click', (event) => {
      this.loadMore();
    })
  }

  async loadMore() {
    this.page += 1;
    const result = await this.getImages();
    this.checkResult(result)
    this.renderResults(result.data.hits)
  }

  async search(q) {
    this.galleryContainer.innerHTML = '';
    this.hitsCount = 0;
    this.page = 1;
    this.searchTerm = q;
    const result = await this.getImages();
    this.checkResult(result)
    this.renderResults(result.data.hits)
  }

  checkResult(result) {
    if (result.data.totalHits === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      this.loadMoreButton.classList.remove('visible');
      return;
    }
    this.hitsCount += result.data.hits.length;
    if (this.hitsCount === result.data.totalHits) {
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      this.loadMoreButton.classList.remove('visible');
    } else {
      this.loadMoreButton.classList.add('visible');
    }
  }

  async getImages() {
    return axios.get(Gallery.URL, {
      params: {
        key: Gallery.KEY,
        per_page: Gallery.PER_PAGE,
        page: this.page,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        q: this.searchTerm
      }
    })
  }

  renderResults(results) {
    const galleryMarkup = this.createGalleryCardMarkup(results);
    this.galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);
  }

  createGalleryCardMarkup(galleryItems) {
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
      `;
    })
    .join('');
  }
}
