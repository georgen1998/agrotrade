import Api from './Api';

export default {
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
