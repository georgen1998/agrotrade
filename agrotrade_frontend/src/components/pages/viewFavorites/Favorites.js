import PersonService from '@/services/PersonService';
import ProductService from '@/services/ProductService';
import EventService from '@/services/EventService';
import FavoriteService from '@/services/FavoritesService';

export default {
  name: 'ViewFavorites',
  data() {
    return {
      favorites: [],
      farmerFavorites: [],
      productFavorites: [],
      eventFavorites: [],
      id: null,
    };
  },
  async created() {
    this.id = localStorage.getItem('userId');
    await this.fetchFavorites();
  },
  methods: {
    async fetchFavorites() {
      try {
        const customerId = this.$route.params;
        if (!customerId) {
          throw new Error('Customer ID is undefined');
        }
        const favorites = await FavoriteService.getFavorites();
        this.favorites = favorites.filter((favorite) => favorite.customer_id === Number(this.id));

        const farmerIds = this.favorites
          .filter((fav) => fav.farmer_id)
          .map((fav) => fav.farmer_id);
        const productIds = this.favorites
          .filter((fav) => fav.product_id)
          .map((fav) => fav.product_id);
        const eventIds = this.favorites
          .filter((fav) => fav.event_id)
          .map((fav) => fav.event_id);
        if (farmerIds.length) {
          this.farmerFavorites = await Promise.all(
            farmerIds.map(async (id) => {
              const farmer = await PersonService.getPersonId(id);
              return { ...farmer, id };
            }),
          );
        }
        if (productIds.length) {
          this.productFavorites = await Promise.all(
            productIds.map(async (id) => {
              const product = await ProductService.getProductId(id);
              return { name: product.name, image: product.image, id };
            }),
          );
        }
        if (eventIds.length) {
          this.eventFavorites = await Promise.all(
            eventIds.map(async (id) => {
              const event = await EventService.getEventId(id);
              if (event) {
                return { type: event.type, address: event.address, id };
              }
              return null;
            }),
          );
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    },
    async removeFarmer(id) {
      await FavoriteService.deleteFarmer(id);
      this.fetchFavorites();
    },
    async removeProduct(id) {
      await FavoriteService.deleteProduct(id);
      this.fetchFavorites();
    },
    async removeEvent(id) {
      await FavoriteService.deleteEvent(id);
      this.fetchFavorites();
    },

  },
};
