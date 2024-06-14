import { required, email, numeric } from 'vuelidate/lib/validators';
import PostService from '@/services/PostService';

export default {
  name: 'EditPostComponent',
  data() {
    return {
      postForm: {
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
  mounted() {
    this.getPostById();
  },

  methods: {
    async getPostById() {
      const { id } = this.$route.params;
      const response = await PostService.getPostId(id);

      this.postForm = { ...response };
    },
    async updateFormPost() {
      try {
        this.isSubmitted = true;

        this.$v.$touch();
        if (this.$v.$invalid) {
          this.$swal('Oops!', 'Invalid values in required fields', 'error');
          return;
        }

        await PostService.updatePost(this.postForm);
        document.querySelector('.card-body').style.display = 'none';
        this.$swal({
          title: 'Post updated successfully!',
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
