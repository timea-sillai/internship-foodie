import axios from 'axios';

export type CreditType = {
  name: string;
  type: string;
};

export type FeedItemDetails = {
  thumbnail_url: string;
  name: string;
  credits: CreditType[];
  description: string;
};

export type FeedItem = {
  type: string;
  item: FeedItemDetails;
};

export type FeedCarousel = {
  type: string;
  name: string;
  items: FeedItemDetails[];
};

export type FeedData = { items?: FeedItem[]; carousels?: FeedCarousel[] };

export type SearchResult = {
  display: string;
  search_value: string;
  type: string;
};

const options = {
  baseURL: 'https://tasty.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': '38c1ebc0e1msh7e95f4dd90c1977p15ba38jsnb9629b96b64f',
    'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
  }
};

const axiosInstance = axios.create(options);

class AxiosService {
  fetchFeed = async (): Promise<FeedData> => {
    const items: FeedItem[] = [];
    const carousels: FeedCarousel[] = [];
    const feedData = await axiosInstance
      .get('/feeds/list', {
        params: { size: '13', timezone: '+0700', vegetarian: 'false', from: '0' }
      })
      .then(function (response) {
        const result = response.data.results;
        return result;
      })
      .catch(function (error) {
        console.log(error);
      });

    feedData.map(data => {
      if (data.type === 'item') {
        items.push(data);
      } else if (data.type === 'carousel') {
        carousels.push(data);
      }
    });
    return {
      items: items,
      carousels: carousels
    };
  };

  fetchAutocompleteSuggestions = async (searchInput: string): Promise<SearchResult[]> => {
    return await axiosInstance
      .get('/recipes/auto-complete', {
        params: { prefix: searchInput }
      })
      .then(function (response) {
        const result = response.data.results;
        return result;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

const axiosService = new AxiosService();
export default axiosService;
