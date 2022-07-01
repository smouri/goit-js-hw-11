import { fetchImgsData } from './fetchRequest';
import Notiflix from 'notiflix';
import createGalleryCard from '../templates/galleryCard.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchFormEl = document.querySelector('.search-form');
const galleryWrapperEl = document.querySelector('.gallery');

let totalHits = 0;

let page = 1;
let lightbox = null;

const observer = new IntersectionObserver(async entries => {
  const cardsArr = document.querySelectorAll('.photo-card');
  const [entry] = entries;

  if (!entry.isIntersecting || !cardsArr.length) return;

  if (cardsArr.length >= totalHits) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    return;
  }

  const requestValue = searchFormEl.searchQuery.value;
  page += 1;

  try {
    const response = await fetchImgsData(requestValue, page);
    const imgArr = response.hits;
    totalHits = response.totalHits;

    imgArr.forEach(img => {
      galleryWrapperEl.insertAdjacentHTML('beforeend', createGalleryCard(img));
    });

    lightbox.refresh();
  } catch (error) {
    console.log(error.message);
  }
});

observer.observe(document.querySelector('.intersection'));

searchFormEl.addEventListener('submit', async event => {
  event.preventDefault();
  galleryWrapperEl.innerHTML = '';
  page = 1;

  const requestValue = event.currentTarget.searchQuery.value;

  try {
    const response = await fetchImgsData(requestValue, page);
    const imgArr = response.hits;
    totalHits = response.totalHits;

    imgArr.forEach(img => {
      galleryWrapperEl.insertAdjacentHTML('beforeend', createGalleryCard(img));
    });

    lightbox = new SimpleLightbox('.gallery a');

    if (imgArr.length) {
      Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
    } else {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    if (imgArr.length >= totalHits) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }
  } catch (error) {
    console.log(error.message);
  }
});
