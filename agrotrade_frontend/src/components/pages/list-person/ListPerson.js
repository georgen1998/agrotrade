import PersonService from '@/services/PersonService';
import EventService from '@/services/EventService';
import FarmerEventService from '@/services/FarmerEventsService';
import PostService from '@/services/PostService';
import FavoriteService from '@/services/FavoritesService';

export default {
  name: 'ListPersonComponent',
  data() {
    return {
      person: {},
      farmerEvent: [],
      favoriteForm: {
        customer_id: null,
        product_id: null,
        farmer_id: null,
        event_id: null,
      },
      liked: false,
      event: {},
      posts: [],
      filteredPosts: [],
      arg: null,
    };
  },
  mounted() {
    this.arg = this.$route.params.id;
    this.getPersonById();
    this.favoriteForm.customer_id = localStorage.getItem('userId');
    this.favoriteForm.farmer_id = this.$route.params.id;
    this.getFarmerEventsById();
    this.getPosts();
    this.isFavorite();
  },
  methods: {
    async isFavorite() {
      const favorites = await FavoriteService.getFavorites();
      favorites.forEach((result) => {
        if (result.customer_id === Number(this.favoriteForm.customer_id)) {
          if (result.farmer_id === Number(this.favoriteForm.farmer_id)) {
            this.liked = true;
          }
        }
      });
    },

    async addlike() {
      try {
        this.isSubmitted = true;
        await FavoriteService.createNewFavorite(this.favoriteForm);
        this.liked = true;
      } catch (error) {
        console.log(error);
      }
    },
    async getEventById(id) {
      const response = await EventService.getEventId(id);
      this.event = { ...response };
    },
    async getPersonById() {
      const { id } = this.$route.params;
      const response = await PersonService.getPersonId(id);
      this.person = { ...response };
    },
    async getFarmerEventsById() {
      const { id } = this.$route.params;
      const response = await FarmerEventService.getEventFarmerId(id);
      this.farmerEvent = response.event_id;
    },
    async getPosts() {
      try {
        const allPosts = await PostService.getPosts();
        this.filteredPosts = allPosts.filter((post) => post.farmer_id === parseInt(this.arg, 10));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
  },
};
