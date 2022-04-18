import axios from 'axios';

export class PixabayApi {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '26811540-175833433f46e4c27f0a8055d';
  constructor() {
    this.page = 1;
    this.query = null;
  }
  async fetchPhotos() {
    try {
      return axios.get(
        `${this.#BASE_URL}?q=${
          this.query
        }&image_type=photo&orientation=horizontal&safesearch=true&page=${
          this.page
        }&per_page=40&key=${this.#API_KEY}`,
      );
    } catch (err) {
      console.log(err);
    }
  }
}
