import { required, email, numeric } from 'vuelidate/lib/validators';
import PostService from '@/services/PostService';
import UploadService from '@/services/UploadService';

export default {
  name: 'CreatePostComponent',
  data() {
    return {
      postForm: {
        farmer_id: null,
        title: null,
        image: null,
        description: null,
      },
      isSubmitted: false,
    };
  },
  validations: {
    postForm: {
      farmer_id: { required },
      title: { required },
      image: { },
      description: { },
    },
  },
  methods: {
    async onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        // Check file size (e.g., limit to 2MB)
        const maxSizeMB = 2;
        if (file.size > maxSizeMB * 1024 * 1024) {
          this.imageError = `File size should be less than ${maxSizeMB} MB`;
          this.postForm.image = '';
          return;
        }

        try {
          const imageUrl = await UploadService.uploadImage(file);
          this.postForm.image = imageUrl;
          this.imageError = ''; // Clear previous errors if any
        } catch (error) {
          this.imageError = 'Image upload failed';
        }
      }
    },

    handleSubmitForm() { },

    async submitNewPost() {
      try {
        this.isSubmitted = true;

        this.postForm.farmer_id = localStorage.getItem('userId');
        this.$v.$touch();
        if (this.$v.$invalid) {
          this.$swal('Oops!', 'Invalid values in required fields', 'error');
          return;
        }
        await PostService.createNewPost(this.postForm);
        document.querySelector('.card-body').style.display = 'none';
        this.$swal({
          title: 'Post added successfully!',
          icon: 'success',
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEnterKey: true,
          allowEscapeKey: false,
          customClass: {
            popup: 'd-flex align-items-center justify-content-center',
          },
        }).then((data) => {
          this.$router.push({
            name: 'list-posts',
          });
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
