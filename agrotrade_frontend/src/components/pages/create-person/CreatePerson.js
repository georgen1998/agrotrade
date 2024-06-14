import { required, email, numeric } from 'vuelidate/lib/validators';
import PersonService from '@/services/PersonService';
import UploadService from '@/services/UploadService';

export default {
  name: 'CreatePersonComponent',
  data() {
    return {
      address: {
        street: '',
        number: '',
        city: '',
        postalCode: '',
        country: '',
      },
      personForm: {
        email: null,
        username: null,
        password: null,
        fullname: null,
        telephone: null,
        address: '',
        type: null,
        image: null,
        vat_number: null,
      },
      isSubmitted: false,
      imageError: '',
    };
  },
  validations: {
    personForm: {
      email: { required, email },
      username: { required },
      password: { required },
      fullname: { required },
      telephone: { required },
      address: { required },
      type: { required },
      image: {},
      vat_number: {},
    },
  },
  computed: {
    combinedAddress() {
      return `${this.address.street}, ${this.address.number}, ${this.address.city}, ${this.address.postalCode}, ${this.address.country}`;
    },
  },
  watch: {
    combinedAddress(newAddress) {
      this.personForm.address = newAddress;
    },
  },
  mounted() {
    this.personForm.address = this.combinedAddress;
  },
  methods: {
    async onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        // Check file size (e.g., limit to 2MB)
        const maxSizeMB = 2;
        if (file.size > maxSizeMB * 1024 * 1024) {
          this.imageError = `File size should be less than ${maxSizeMB} MB`;
          this.personForm.image = '';
          return;
        }
        try {
          const imageUrl = await UploadService.uploadImage(file);
          this.personForm.image = imageUrl;
          this.imageError = ''; // Clear previous errors if any
        } catch (error) {
          this.imageError = 'Image upload failed';
        }
      }
    },

    handleSubmitForm() { },

    async submitNewPerson() {
      try {
        this.isSubmitted = true;

        this.$v.$touch();
        if (this.$v.$invalid) {
          this.$swal('Oops!', 'Invalid values in required fields', 'error');
          return;
        }

        await PersonService.createNewPerson(this.personForm);
        document.querySelector('.card-body').style.display = 'none';
        this.$swal({
          title: 'Register completed. Please log in now',
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
            name: 'login',
          });
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
