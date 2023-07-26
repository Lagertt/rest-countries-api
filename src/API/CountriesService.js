import axios from 'axios';

export default class CountriesService {
  static async getAll() {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
