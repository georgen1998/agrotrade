import FarmerProductsService from '@/services/FarmerProductsService';
import ProductService from '@/services/ProductService';

export default {
  name: 'FarmerProducts',
  data() {
    return {
      products: [],
      type: localStorage.getItem('type') || null,
    };
  },
  async mounted() {
    const farmerId = this.$route.params.id;
    try {
      await this.fetchFarmersSellingProduct(farmerId);
    } catch (error) {
      console.error('Error fetching farmer products:', error);
    }
  },
  methods: {
    async fetchFarmersSellingProduct(farmerId) {
      try {
        const farmerProducts = await FarmerProductsService.getFarmerId(farmerId);
        const productIds = farmerProducts.map((product) => product.product_id);
        const productsDetails = await Promise.all(
          productIds.map(async (productId) => {
            const productData = await ProductService.getProductId(productId);
            if (productData && farmerProducts) {
              const farmerProduct = farmerProducts.find((fp) => fp.product_id === productId);
              const price = farmerProduct.price;
              productData.product_farmer = farmerProduct;
              productData.price = price; // Assign the price to the productData
              return productData; // Return the product if it exists
            }
            return null; // Return null for products that don't exist
          }),
        );
        this.products = productsDetails.filter((product) => product !== null);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async goToProductDetails(productId) {
      this.$router.push({
        name: 'productdetails',
        params: {
          id: productId,
        },
      });
    },
    getProductImage(imageClass) {
      return imageClass;
    },
  },
};
