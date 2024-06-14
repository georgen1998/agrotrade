import Api from './Api';

export default {

  async createNewEvent(event) {
    try {
      const response = await Api().post('/events', event);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async getEvents() {
    try {
      const response = await Api().get('/events');
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async getEventId(id) {
    try {
      const response = await Api().get(`/events/${id}`);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async updateEvent(event) {
    try {
      const id = event.id;
      const response = await Api().put(`/events/${id}`, event);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async deleteEvent(id) {
    try {
      const response = await Api().delete(`/events/${id}`);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },
};
