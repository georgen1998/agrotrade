import FarmerProductsService from '@/services/FarmerProductsService';
import PersonService from '@/services/PersonService';
import ProductService from '@/services/ProductService';
import FavoriteService from '@/services/FavoritesService';

export default {
  name: 'ProductDetailsAndFarmers',
  data() {
    return {
      product: {},
      farmers: [],
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
    this.favoriteForm.product_id = this.$route.params.id;
    this.isFavorite();
    const productId = parseInt(this.$route.params.id, 10);
    if (Number.isNaN(productId)) {
      console.error('Invalid product ID');
      return;
    }
    await this.fetchProductDetails(productId);
    await this.fetchFarmersSellingProduct(productId);
  },
  methods: {
    async isFavorite() {
      const favorites = await FavoriteService.getFavorites();
      favorites.forEach((result) => {
        if (result.customer_id === Number(this.favoriteForm.customer_id)) {
          if (result.product_id === Number(this.favoriteForm.product_id)) {
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
    async fetchProductDetails(productId) {
      try {
        const productDetails = await ProductService.getProductId(productId);
        this.product = productDetails;
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    },
    async fetchFarmersSellingProduct(productId) {
      try {
        const farmerProducts = await FarmerProductsService.getProductId(productId);
        const farmerIds = farmerProducts.map((farmerProduct) => farmerProduct.farmer_id);
        const farmers = await Promise.all(
          farmerIds.map(async (farmerId) => {
            const farmer = await PersonService.getPersonId(farmerId);
            farmer.farmer_product = farmerProducts.find((fp) => fp.farmer_id === farmerId);
            return farmer;
          }),
        );
        this.farmers = farmers;
      } catch (error) {
        console.error('Error fetching farmers selling product:', error);
      }
    },
    sortFarmersByPrice(order) {
      this.farmers.sort((a, b) => {
        const priceA = parseFloat(a.farmer_product.price);
        const priceB = parseFloat(b.farmer_product.price);
        if (order === 'asc') {
          return priceA - priceB;
        }
        return priceB - priceA;
      });
    },
    formatPrice(price) {
      return parseFloat(price).toFixed(2);
    },
    navigateToFarmer(id) {
      this.$router.push({ name: 'list-person', params: { id } });
    },
  },
};
