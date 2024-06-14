import Api from './Api';

export default {
  async getProductId(productId) {
    try {
      const response = await Api().get(`/farmerProducts/${productId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  async createFarmerProduct(product) {
    try {
      const response = await Api().post('/farmerProducts', product);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  async getFarmerId(productId) {
    try {
      const response = await Api().get(`/productsFarmer/${productId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};
