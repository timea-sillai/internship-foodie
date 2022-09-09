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
  id: number;
};

export type Instructions = {
  text: string;
  position: number;
};

export type NutritionDetails = {
  protein: number;
  sugar: number;
  fiber: number;
  calories: number;
  carbohydrates: number;
  fat: number;
};

export type RecipeItem = {
  name: string;
  description: string;
  thumbnail_url: string;
  nutrition: NutritionDetails;
  credits: CreditType;
  instruction: Instructions;
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
    'X-RapidAPI-Key': '2e8b9cc6femsh1719093212e7620p1df84bjsn4fc760ab2557',
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

  fetchRecipeDetails = async (recipeId: string): Promise<RecipeItem> => {
    return await axiosInstance
      .get('/recipes/detail', {
        params: { id: recipeId }
      })
      .then(function (response) {
        const result = response.data;
        return result;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

const axiosService = new AxiosService();
export default axiosService;
