import { required, email, numeric } from 'vuelidate/lib/validators';
import PersonService from '@/services/PersonService';
import UploadService from '@/services/UploadService';

export default {
  name: 'EditPersonComponent',
  data() {
    return {
      personForm: {
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
  mounted() {
    this.getPersonById();
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
    async getPersonById() {
      const { id } = this.$route.params;
      const response = await PersonService.getPersonId(id);

      this.personForm = { ...response };
    },
    async updateFormPerson() {
      const { personId } = this.$route.params;
      try {
        this.isSubmitted = true;

        this.$v.$touch();
        if (this.$v.$invalid) {
          this.$swal('Oops!', 'Invalid values in required fields', 'error');
          return;
        }

        await PersonService.updatePerson(this.personForm);
        document.querySelector('.card-body').style.display = 'none';
        this.$swal({
          title: 'Person updated successfully!',
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
