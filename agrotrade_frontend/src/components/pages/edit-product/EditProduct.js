import { required, numeric } from 'vuelidate/lib/validators';
import ProductService from '@/services/ProductService';

export default {
  name: 'EditProductComponent',
  data() {
    return {
      productForm: {
      },
      isSubmitted: false,
    };
  },
  validations: {
    productForm: {
      name: { required },
      type: { required },
      image: { },
    },
  },
  mounted() {
    this.getProductById();
  },

  methods: {
    async getProductById() {
      const { id } = this.$route.params;
      const response = await ProductService.getProductId(id);

      this.productForm = { ...response };
    },
    async updateFormProduct() {
      try {
        this.isSubmitted = true;

        this.$v.$touch();
        if (this.$v.$invalid) {
          this.$swal('Oops!', 'Invalid values in required fields', 'error');
          return;
        }

        await ProductService.updateProduct(this.productForm);
        document.querySelector('.card-body').style.display = 'none';
        this.$swal({
          title: 'Product updated successfully!',
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
