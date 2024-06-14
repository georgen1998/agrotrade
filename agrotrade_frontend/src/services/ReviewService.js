import Api from './Api';

export default {

  async createNewReview(review) {
    try {
      const response = await Api().post('/reviews', review);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async getReviews() {
    try {
      const response = await Api().get('/reviews');
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async getReviewId(id) {
    try {
      const response = await Api().get(`/reviews/${id}`);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },
  async deleteReview(id) {
    try {
      const response = await Api().delete(`/reviews/${id}`);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },
};
