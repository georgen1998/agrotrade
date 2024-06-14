import Api from './Api';

export default {

  async createNewPerson(person) {
    try {
      const response = await Api().post('/persons', person);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async getPersons(type = null) {
    try {
      let url = '/persons';
      if (type !== null) {
        url += `?type=${type}`;
      }
      const response = await Api().get(url);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async getPersonId(id) {
    try {
      const response = await Api().get(`/persons/${id}`);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async updatePerson(person) {
    try {
      const id = person.id;
      const response = await Api().put(`/persons/${id}`, person);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async deletePerson(id) {
    try {
      const response = await Api().delete(`/persons/${id}`);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async uploadImage(imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await Api().post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.imageUrl;
    } catch (error) {
      console.log(error);
      throw new Error('Image upload failed');
    }
  },
};
