import { required, numeric } from 'vuelidate/lib/validators';
import FarmerProductsService from '@/services/FarmerProductsService';
import ProductService from '@/services/ProductService';
import UploadService from '@/services/UploadService';

export default {
  name: 'CreateProductComponent',
  data() {
    return {
      productForm: {
        farmer_id: null,
        product_id: null,
        price: null,
        description: null,
      },
      products: [],
      isSubmitted: false,
    };
  },
  validations: {
    productForm: {
      farmer_id: { required },
      product_id: { required },
      price: { required },
      description: { },
    },
  },
  async mounted() {
    try {
      this.products = await ProductService.getProducts();
      console.log(this.products);
    } catch (error) {
      console.error(error);
    }
  },

  methods: {

    handleSubmitForm() { },

    async submitNewProduct() {
      try {
        this.productForm.farmer_id = localStorage.getItem('userId');
        this.isSubmitted = true;
        console.log(this.productForm);
        this.$v.$touch();
        if (this.$v.$invalid) {
          this.$swal('Oops!', 'Invalid values in required fields', 'error');
          return;
        }

        await FarmerProductsService.createFarmerProduct(this.productForm);
        document.querySelector('.card-body').style.display = 'none';
        this.$swal({
          title: 'Product added successfully!',
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
            name: 'list-products',
          });
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
