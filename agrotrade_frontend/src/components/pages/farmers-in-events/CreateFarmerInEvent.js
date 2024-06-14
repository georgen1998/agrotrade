import PersonService from '@/services/PersonService';
import FarmerEventService from '@/services/FarmerEventsService';
import EventService from '@/services/EventService';
import FavoriteService from '@/services/FavoritesService';

export default {
  name: 'CreateFarmerInEvent',
  data() {
    return {
      farmers: [],
      eventDetails: {},
      favoriteForm: {
        customer_id: null,
        product_id: null,
        farmer_id: null,
        event_id: null,
      },
      liked: false,
    };
  },
  async mounted() {
    this.favoriteForm.customer_id = localStorage.getItem('userId');
    this.favoriteForm.event_id = this.$route.params.id;
    this.isFavorite();
    const eventId = parseInt(this.$route.params.id, 10);
    if (Number.isNaN(eventId)) {
      console.error('Invalid event ID');
      return;
    }
    await this.fetchEventDetails(eventId);
    await this.fetchFarmers(eventId);
  },
  methods: {
    async isFavorite() {
      const favorites = await FavoriteService.getFavorites();
      favorites.forEach((result) => {
        if (result.customer_id === Number(this.favoriteForm.customer_id)) {
          if (result.event_id === Number(this.favoriteForm.event_id)) {
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
    async fetchEventDetails(eventId) {
      try {
        const event = await EventService.getEventId(eventId);
        if (event) {
          this.eventDetails.type = event.type;
          this.eventDetails.address = event.address;
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    },
    async fetchFarmers(eventId) {
      try {
        const farmerEvents = await FarmerEventService.getEventId(eventId);
        const farmerIds = farmerEvents.map((event) => event.farmer_id);
        const farmers = await Promise.all(
          farmerIds.map(async (farmerId) => {
            const farmer = await PersonService.getPersonId(farmerId);
            const profileImage = farmer.image
              ? `https://agrotrade.shopitnow.gr${farmer.image}`
              : 'https://agrotrade.shopitnow.gr/uploads/default-person.jpg';
            return {
              ...farmer,
              profile_image: profileImage,
            };
          }),
        );
        this.farmers = farmers;
      } catch (error) {
        console.error('Error fetching farmers:', error);
      }
    },
    navigateToProfile(id) {
      this.$router.push({ name: 'list-person', params: { id } });
    },
  },
};
