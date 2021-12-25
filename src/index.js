import './sass/main.scss';
import { Gallery } from './gallery';

let gallery = new Gallery('.gallery', '#load-btn');

let formSearch = document.querySelector('#search-form');
formSearch.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchInputValue = event.target.elements.searchQuery.value;
  gallery.search(searchInputValue);
})
