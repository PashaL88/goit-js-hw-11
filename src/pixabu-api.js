import axios from 'axios';

export class PixabayApi {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '26811540-175833433f46e4c27f0a8055d';
  constructor() {
    this.page = 1;
    this.query = null;
    this.totalPage = null;
  }
  async fetchPhotos() {
    const params = new URLSearchParams({
      q: this.query,
      image_type: this.photo,
      orientatiom: this.horizontal,
      safesearch: this.true,
      page: this.page,
      per_page: 40,
      key: this.#API_KEY,
    });
    try {
      return await axios.get(`${this.#BASE_URL}?${params}`);
    } catch (err) {
      console.log(err);
    }
  }
}
