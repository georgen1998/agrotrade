import ProductService from '@/services/ProductService';

export default {
  name: 'ProductPage',
  data() {
    return {
      products: [],
      type: null,
      userid: null,
    };
  },
  async mounted() {
    this.type = localStorage.getItem('type');
    this.userid = localStorage.getItem('userId');
    try {
      this.products = await ProductService.getProducts();
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
  methods: {
    goToProductDetails(productId) {
      this.$router.push({ name: 'productdetails', params: { id: productId } });
    },
  },
};
