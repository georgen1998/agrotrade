import { required, between } from 'vuelidate/lib/validators';
import ReviewService from '@/services/ReviewService';
import PersonService from '@/services/PersonService';

export default {
  name: 'CreateReviewComponent',
  data() {
    return {
      reviewForm: {
        farmer_id: '',
        customer_id: '',
        stars: '',
        description: '',
      },
      isSubmitted: false,
      reviews: [],
      farmerId: null,
      type: null,
      flag: true,
    };
  },
  validations: {
    reviewForm: {
      stars: {
        required,
        between: between(1, 5),
      },
      description: {
        required,
      },
    },
  },
  async created() {
    this.type = localStorage.getItem('type');
    this.reviewForm.farmer_id = this.$route.params.id;
    this.reviewForm.customer_id = localStorage.getItem('userId');
    await this.fetchReviews();
  },
  methods: {
    async handleSubmitForm() {
      this.isSubmitted = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        try {
          await ReviewService.createNewReview(this.reviewForm);
          await this.fetchReviews(); // Refresh reviews after adding a new one
        } catch (error) {
          console.error('Error creating review:', error);
        }
      }
    },
    async fetchReviews() {
      try {
        const response = await ReviewService.getReviews();

        const reviewsWithDetails = await Promise.all(
          response.filter((review) => review.farmer_id === Number(this.reviewForm.farmer_id))
            .map(async (review) => {
              const customer = await PersonService.getPersonId(review.customer_id);
              return {
                ...review,
                customer: {
                  username: customer.username,
                  profile_image: customer.image,
                },
              };
            }),
        );

        reviewsWithDetails.forEach((result) => {
          if (result.customer_id === Number(this.reviewForm.customer_id)) {
            this.flag = false;
          }
        });

        this.reviews = reviewsWithDetails;
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    },
  },
};
