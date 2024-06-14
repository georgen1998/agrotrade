import Api from './Api';

export default {

  async createNewProduct(product) {
    try {
      const response = await Api().post('/products', product);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async getProducts() {
    try {
      const response = await Api().get('/products');
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async getProductId(id) {
    try {
      const response = await Api().get(`/products/${id}`);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async updateProduct(product) {
    try {
      const id = product.id;
      const response = await Api().put(`/products/${id}`, product);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async deleteProduct(id) {
    try {
      const response = await Api().delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async getCustomerProducts(id) {
    try {
      const response = await Api().get(`/customer-products/${id}`);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },
};
