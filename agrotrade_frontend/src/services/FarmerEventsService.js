import Api from './Api';

export default {
  async getEventId(eventId) {
    try {
      const response = await Api().get(`/farmerEvents/${eventId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  async getEventFarmerId(farmerId) {
    try {
      const response = await Api().get(`/eventsFarmer/${farmerId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  async getAllFarmerEvents() {
    try {
      const response = await Api().get('/farmerEvents');
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};
