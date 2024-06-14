import Api from './Api';

export default {

  async createNewFavorite(favorite) {
    try {
      const response = await Api().post('/favorites', favorite);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async getFavorites() {
    try {
      const response = await Api().get('/favorites');
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async getFavoritesId(id) {
    try {
      const response = await Api().get(`/favorites/${id}`);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async deleteAll(id) {
    try {
      const response = await Api().delete(`/favorites/${id}`);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async deleteFarmer(id) {
    try {
      const response = await Api().delete(`/favoritesFarmer/${id}`);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async deleteProduct(id) {
    try {
      const response = await Api().delete(`/favoritesProduct/${id}`);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async deleteEvent(id) {
    try {
      const response = await Api().delete(`/favoritesEvent/${id}`);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },
};
