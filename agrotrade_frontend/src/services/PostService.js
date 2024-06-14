import Api from './Api';

export default {

  async createNewPost(post) {
    try {
      const response = await Api().post('/posts', post);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async getPosts() {
    try {
      const response = await Api().get('/posts');
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async getPostId(id) {
    try {
      const response = await Api().get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async updatePost(post) {
    try {
      const id = post.id;
      const response = await Api().put(`/posts/${id}`, post);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async deletePost(id) {
    try {
      const response = await Api().delete(`/posts/${id}`);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },
};
