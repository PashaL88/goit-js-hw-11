import './sass/main.scss';
// import axios from 'axios';
import Notiflix from 'notiflix';
import { PixabayApi } from './pixabu-api';
import createGalleryCard from './partials/createGalleryCard';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input[name="searchQuery"]');
const galleryEl = document.querySelector('.gallery');
const observeEl = document.querySelector('.target-element');
// const buttonEl = document.querySelector('.load-more');
const options = {
  root: null,
  rootMargin: '200px',
  threshold: 1.0,
};

const observer = new IntersectionObserver((entries, observe) => {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      pixabayApi.page += 1;

      try {
        const photosResponse = await pixabayApi.fetchPhotos();

        if (pixabayApi.page === pixabayApi.totalPage) {
          // buttonEl.classList.add('is-hidden');
          observer.unobserve(observeEl);
          Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        }
        galleryEl.insertAdjacentHTML('beforeend', createGalleryCard(photosResponse.data.hits));
        const { height: cardHeight } = galleryEl.firstElementChild.getBoundingClientRect();

        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
        let lightbox = new SimpleLightbox('.gallery a');
      } catch (err) {
        console.log(err);
      }
    }
  });
}, options);

const pixabayApi = new PixabayApi();

const onSubmit = async event => {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements['searchQuery'].value.trim();
  pixabayApi.query = searchQuery;

  if (searchQuery === '') {
    Notiflix.Notify.info('Please type something');
    return;
  }
  try {
    const photosResponse = await pixabayApi.fetchPhotos();
    pixabayApi.totalPage = Math.floor(photosResponse.data.totalHits / 40);
    if (photosResponse.data.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
      return;
    }
    // galleryEl.innerHTML = createGalleryCard(photosResponse.data.hits);
    // const { height: cardHeight } = galleryEl.firstElementChild.getBoundingClientRect();

    // window.scrollBy({
    //   top: cardHeight * 2,
    //   behavior: 'smooth',
    // });

    observer.observe(observeEl);

    let lightbox = new SimpleLightbox('.gallery a');
    // buttonEl.classList.remove('is-hidden');
  } catch (err) {
    console.log(error);
  }
};

// const onButtonClick = async event => {
//   pixabayApi.page += 1;

//   try {
//     const photosResponse = await pixabayApi.fetchPhotos();

//     if (pixabayApi.page === pixabayApi.totalPage) {
//       buttonEl.classList.add('is-hidden');
//       Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
//     }
//     galleryEl.insertAdjacentHTML('beforeend', createGalleryCard(photosResponse.data.hits));
//     const { height: cardHeight } = galleryEl.firstElementChild.getBoundingClientRect();

//     window.scrollBy({
//       top: cardHeight * 2,
//       behavior: 'smooth',
//     });
//     let lightbox = new SimpleLightbox('.gallery a');
//   } catch (err) {
//     console.log(err);
//   }
// };

formEl.addEventListener('submit', onSubmit);
// buttonEl.addEventListener('click', onButtonClick);
